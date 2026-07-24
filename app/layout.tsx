import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { I18nProvider } from '@/components/shared/I18nProvider';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <I18nProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
