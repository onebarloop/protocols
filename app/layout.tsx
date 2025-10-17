import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/custom/sidebar';
import { Toaster } from '@/components/ui/sonner';
import  SidebarTrigger  from '@/components/custom/sidebar-trigger';

export const metadata: Metadata = {
  title: 'Protocols',
  description: 'Collaborative tool for generating and managing protocols.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state_protocols')?.value === 'true';
  return (
    <html lang="en" className="dark">
      <body className="">
        <SidebarProvider defaultOpen={defaultOpen}>
        <SidebarTrigger />
          <AppSidebar />
          <main className="w-full overflow-hidden">{children}</main>
          <Toaster richColors position="top-right" />
        </SidebarProvider>
      </body>
    </html>
  );
}
