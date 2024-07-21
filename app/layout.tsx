import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Code Bin',
  description: 'Paste and share',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en' className='max-w-6xl m-auto'>
        <body>
          {/* this div solves a layout shift bug by radix ui  */}
          <div className={`${inter.className} p-6`}>{children}</div>
          <Toaster className='rounded-sm' richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
