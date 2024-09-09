import * as React from 'react';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';

export const metadata = {
  title: 'APK Mods Search | Find Modded APKs Fast',
  description: 'APK Mods Search is a fast and reliable search engine for discovering modded APKs from trusted sources. Powered by Cloudflare and Google CSE, get the best APK mods quickly.',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="darkreader-lock" />
        <meta property="og:title" content="APK Mods Search | Find Modded APKs Fast" />
        <meta property="og:description" content="APK Mods Search is a fast and reliable search engine for discovering modded APKs from trusted sources. Powered by Cloudflare and Google CSE, get the best APK mods quickly." />
        <meta property="og:image" content="https://apkmodsearch.pages.dev/ogimage.jpg" />
        <meta property="og:url" content="https://apkmodsearch.pages.dev/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="APK Mods Search" />
      </head>
      <body>
        <ThemeRegistry>{props.children}</ThemeRegistry>
      </body>
    </html>
  );
}
