import type { Metadata, Viewport } from 'next';
import '../app/globals.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH || '';

export const metadata: Metadata = {
  title: 'DB SafeLearn — Проводник по безопасности',
  description: 'Ваш проводник по правилам безопасности на путях DB InfraGO. Термины, правила, GSM-R, сценарии.',
  manifest: `${basePath}/manifest.json`,
  icons: {
    icon: [{ url: `${basePath}/icons/icon-192.png`, sizes: '192x192', type: 'image/png' }],
    apple: [{ url: `${basePath}/icons/icon-512.png`, sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#EC0016',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="dark">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-screen bg-db-dark text-db-light">{children}</body>
    </html>
  );
}
