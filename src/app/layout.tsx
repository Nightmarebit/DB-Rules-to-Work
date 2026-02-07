import type { Metadata, Viewport } from 'next';
import '../app/globals.css';

export const metadata: Metadata = {
  title: 'DB SafeLearn — Проводник по безопасности',
  description: 'Ваш проводник по правилам безопасности на путях DB InfraGO. Термины, правила, GSM-R, сценарии.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'SafeLearn',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: [{ url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }],
    apple: [{ url: '/icons/icon-512.png', sizes: '180x180', type: 'image/png' }],
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
      <body className="min-h-screen bg-db-dark text-db-light">{children}</body>
    </html>
  );
}
