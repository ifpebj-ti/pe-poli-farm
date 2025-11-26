// src/components/Version.tsx
'use client';

import React from 'react';

import useSWR from 'swr';

type VersionPayload = {
  version: string; // ex: "v2.1.0"
  shortSha: string; // ex: "7113b6f"
  date: string; // ISO string
  url: string | null; // link da release
};

type Props = {
  fixedBottomRight?: boolean;
  locale?: string; // "en-US" para "Apr 28, 2025"
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Version({
  fixedBottomRight = false,
  locale = 'en-US'
}: Props) {
  const { data } = useSWR<VersionPayload>('/api/version', fetcher);

  const fmt = (s?: string) => {
    const d = s ? new Date(s) : new Date();
    return new Intl.DateTimeFormat(locale, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(d);
  };

  const text = data
    ? `${data.version} (${data.shortSha || '-'}, ${fmt(data.date)})`
    : `v0.0.0 (-, ${fmt()})`;

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    fixedBottomRight ? (
      <div
        style={{
          position: 'fixed',
          bottom: 10,
          right: 15,
          fontSize: 12,
          color: '#5c5c5cff',
          zIndex: 9999
        }}
      >
        {children}
      </div>
    ) : (
      <div style={{ fontSize: 12, color: '#5c5c5cff' }}>{children}</div>
    );

  if (!data)
    return (
      <Wrapper>
        <span>{text}</span>
      </Wrapper>
    );

  return (
    <Wrapper>
      {data.url ? (
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#5c5c5cff', textDecoration: 'none' }}
        >
          {text}
        </a>
      ) : (
        <span>{text}</span>
      )}
    </Wrapper>
  );
}
