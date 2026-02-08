import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageTransition } from '@/components/layout/PageTransition';
import { RegisterSW } from '@/components/layout/RegisterSW';

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
      <RegisterSW />
      <div className="flex min-h-dvh flex-col">
        <div className="no-print">
          <Header />
        </div>
        <div className="flex flex-1 flex-col md:flex-row">
          <div className="no-print">
            <Navigation />
          </div>
          <main className="min-w-0 flex-1 p-4 pb-24 md:pb-4">
            <div className="mb-4 no-print">
              <Breadcrumbs />
            </div>
            <PageTransition>{children}</PageTransition>
          </main>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
