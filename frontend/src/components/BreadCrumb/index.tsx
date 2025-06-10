'use client';
import Link from 'next/link';

import { Home, NavigateNext } from '@mui/icons-material';
import {
  Link as MaterialLink,
  Stack,
  Typography,
  Breadcrumbs
} from '@mui/material';

export default function BreadCrumb({
  linkList
}: {
  linkList: { label: string; href: string }[];
}) {
  return (
    <Stack spacing={1}>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" sx={{ color: '#CCCCCC' }} />}
        aria-label="breadcrumb"
      >
        <Home sx={{ color: '#1351B4' }} />
        {linkList.map((link, index) => {
          if (index === linkList.length - 1) {
            return (
              <Typography
                key={index}
                sx={{ color: '#333333', fontSize: '.8rem' }}
              >
                {link.label}
              </Typography>
            );
          } else {
            return (
              <Link href={link.href} passHref legacyBehavior key={index}>
                <MaterialLink underline="none" sx={{ color: '#333333' }}>
                  {link.label}
                </MaterialLink>
              </Link>
            );
          }
        })}
      </Breadcrumbs>
    </Stack>
  );
}
