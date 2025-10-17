import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/custom/sidebar';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Protocols',
  description: 'Collaborative tool for generating and managing protocols.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="">
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full overflow-hidden">{children}</main>
          <Toaster richColors position="top-right" />
        </SidebarProvider>
      </body>
    </html>
  );
}
