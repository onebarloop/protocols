import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/custom/sidebar';
import SidebarTrigger from '@/components/custom/sidebar-trigger';
import { cookies } from 'next/headers';
import { getSession } from '@/auth/get-session';
import { redirect } from 'next/navigation';
import { ProtocolsProvider } from '@/contexts/protocols-context';
import { getProtocolNavItems } from '@/dal/queries';
import { SessionProvider } from '@/contexts/session-context';

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
    cookieStore.get('sidebar_state_protocols')?.value === undefined ||
    cookieStore.get('sidebar_state_protocols')?.value === 'true';
  const protocols = await getProtocolNavItems();

  return (
    <SessionProvider session={session}>
      <ProtocolsProvider initialProtocols={protocols}>
        <SidebarProvider defaultOpen={defaultOpen}>
          <SidebarTrigger />
          <AppSidebar />
          <main className="w-full p-4">{children}</main>
        </SidebarProvider>
      </ProtocolsProvider>
    </SessionProvider>
  );
}
