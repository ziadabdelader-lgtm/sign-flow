import '../globals.css';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import { ThemeProvider } from '@/components/shared/ThemeProvider';

export const metadata: Metadata = {
  title: 'Sign Flow — Accessible Communication Without Barriers',
  description:
    'AI-powered communication platform enabling real-time conversations between deaf and hearing users through sign language recognition, text-to-speech, and 3D avatar animations.',
  keywords: ['sign language', 'accessibility', 'AI', 'text-to-speech', '3D avatar', 'deaf communication'],
  authors: [{ name: 'Sign Flow' }],
  openGraph: {
    title: 'Sign Flow — Accessible Communication Without Barriers',
    description: 'AI-powered communication platform for deaf and hearing users.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign Flow',
    description: 'Accessible Communication Without Barriers',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0A2540' },
    { media: '(prefers-color-scheme: dark)', color: '#051828' },
  ],
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
