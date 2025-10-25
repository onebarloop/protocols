import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/custom/sidebar';
import SidebarTrigger from '@/components/custom/sidebar-trigger';
import { cookies } from 'next/headers';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen =
    cookieStore.get('sidebar_state_protocols')?.value === 'true';
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <SidebarTrigger />
      <AppSidebar />
      <main className="w-full p-4">{children}</main>
    </SidebarProvider>
  );
}
