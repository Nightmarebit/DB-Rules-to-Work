import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = (routing.locales as readonly string[]).includes(locale)
    ? locale
    : routing.defaultLocale;
  setRequestLocale(resolvedLocale);
  const messages = (await import(`../../../messages/${resolvedLocale}.json`)).default;

  return (
    <NextIntlClientProvider locale={resolvedLocale} messages={messages}>
      <div className="flex min-h-dvh flex-col">
        <Header />
        <div className="flex flex-1 flex-col md:flex-row">
          <Navigation />
          <main className="flex-1 p-4 pb-24 md:pb-4">
            {children}
          </main>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
