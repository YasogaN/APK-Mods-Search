import * as React from 'react';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';

export const metadata = {
  title: 'APK Mods Search',
  description: 'A Search engine to search for APK Mods',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{props.children}</ThemeRegistry>
      </body>
    </html>
  );
}
