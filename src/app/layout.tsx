import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arifinjayadiningrat.com';

export const metadata: Metadata = {
  title: 'Khusyuk Itu Mudah | Arifin Jayadiningrat',
  description:
    'Buku Khusyuk Itu Mudah. Baca sekarang!',
  icons: {
    icon: '/logo.png?v=2',
    apple: '/logo.png?v=2',
  },
  openGraph: {
    title: 'Khusyuk Itu Mudah | Arifin Jayadiningrat',
    description:
      'Buku Khusyuk Itu Mudah. Baca sekarang!',
    type: 'website',
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/bookFlyer.jpeg`,
        width: 1200,
        height: 630,
        alt: 'Khusyuk Itu Mudah',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen font-sans antialiased flex flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
