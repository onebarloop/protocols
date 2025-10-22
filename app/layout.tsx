import type { Metadata } from 'next';
import './globals.css';

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
      <body className="">{children}</body>
    </html>
  );
}
