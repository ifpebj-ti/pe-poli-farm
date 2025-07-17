import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

import ThemeRegistry from '../theme/ThemeRegistry';
import Providers from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'ProntusVitale',
  description: 'Prontuário eletrônico para policlínicas e farmácias',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
    other: [
      {
        rel: 'icon',
        url: '/logo.png',
        sizes: '16x16'
      },
      {
        rel: 'icon',
        url: '/logo.png',
        sizes: '32x32'
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeRegistry>
          <Providers>{children}</Providers>
        </ThemeRegistry>
      </body>
    </html>
  );
}
