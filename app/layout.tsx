import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Protocols',
  description: 'Collaborative tool for generating and managing protocols.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
