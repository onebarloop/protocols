import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/custom/sidebar';
import SidebarTrigger from '@/components/custom/sidebar-trigger';
import { cookies } from 'next/headers';
import { getSession } from '@/lib/auth/get-session';
import { redirect } from 'next/navigation';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }
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
