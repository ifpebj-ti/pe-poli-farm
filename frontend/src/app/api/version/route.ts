import { NextResponse } from 'next/server';

const REPO = 'ifpebj-ti/pe-poli-farm'; // owner/repo

const GH = (p: string) => `https://api.github.com/repos/${REPO}${p}`;
const headers: HeadersInit = {
  Accept: 'application/vnd.github+json',
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {})
};

// Resolve SHA real de uma tag (cobre tag anotada e lightweight)
async function resolveCommitSha(tag: string): Promise<string | null> {
  const base = tag.replace(/^refs\/tags\//, '');
  const candidates = Array.from(
    new Set([base, base.replace(/^v/, ''), `v${base.replace(/^v/, '')}`])
  );

  for (const t of candidates) {
    const r = await fetch(GH(`/git/refs/tags/${encodeURIComponent(t)}`), {
      headers
    });
    if (r.ok) {
      const ref = await r.json();
      const obj = ref?.object;
      if (obj?.type === 'commit' && obj?.sha) return obj.sha;
      if (obj?.type === 'tag' && obj?.sha) {
        const tr = await fetch(GH(`/git/tags/${obj.sha}`), { headers });
        if (tr.ok) {
          const tj = await tr.json();
          const csha = tj?.object?.sha;
          if (csha) return csha;
        }
      }
    }
  }
  // fallback: /commits/{tag}
  for (const t of candidates) {
    const cr = await fetch(GH(`/commits/${encodeURIComponent(t)}`), {
      headers
    });
    if (cr.ok) {
      const cj = await cr.json();
      if (cj?.sha) return cj.sha;
    }
  }
  return null;
}

export async function GET() {
  try {
    // 1) Tenta releases/latest
    const rel = await fetch(GH('/releases/latest'), {
      headers,
      next: { revalidate: 1800 }
    });
    let tagName: string | null = null;
    let publishedAt: string | null = null;
    let htmlUrl: string | null = null;

    if (rel.ok) {
      const data = await rel.json();
      tagName = data?.tag_name ?? null;
      publishedAt = data?.published_at ?? null;
      htmlUrl = data?.html_url ?? null;
    }

    // 2) Fallback: pega a primeira de /releases (a mais recente)
    if (!tagName || !publishedAt) {
      const list = await fetch(GH('/releases?per_page=1'), {
        headers,
        next: { revalidate: 1800 }
      });
      if (list.ok) {
        const arr = await list.json();
        if (Array.isArray(arr) && arr.length) {
          const x = arr[0];
          tagName = x?.tag_name ?? null;
          publishedAt = x?.published_at ?? null;
          htmlUrl = x?.html_url ?? null;
        }
      }
    }

    if (!tagName || !publishedAt) {
      // ainda falhou -> fallback "v0.0.0"
      return NextResponse.json(
        {
          version: 'v0.0.0',
          shortSha: '-',
          date: new Date().toISOString(),
          url: null
        },
        { status: 200 }
      );
    }

    const sha = (await resolveCommitSha(tagName)) ?? '-';

    return NextResponse.json(
      {
        version: `v${String(tagName).replace(/^v/i, '')}`,
        shortSha: String(sha).slice(0, 7),
        date: publishedAt,
        url: htmlUrl
      },
      {
        headers: { 'Cache-Control': 's-maxage=1800, stale-while-revalidate' },
        status: 200
      }
    );
  } catch {
    return NextResponse.json(
      {
        version: 'v0.0.0',
        shortSha: '-',
        date: new Date().toISOString(),
        url: null
      },
      { status: 200 }
    );
  }
}
