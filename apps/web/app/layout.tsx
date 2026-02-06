import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Preloader from './components/Preloader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DN Multi Services - Industrial Solutions Across DRC & Zambia',
  description: 'Integrated industrial services and supplies company operating in DRC and Zambia. Mining, engineering, energy, logistics, and infrastructure solutions.',
  keywords: 'mining services, industrial supplies, DRC, Zambia, engineering, construction, energy solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Preloader />
        {children}
      </body>
    </html>
  );
}