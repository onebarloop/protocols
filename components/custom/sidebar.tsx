import { Inbox, FilePlus } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuSub,
} from '@/components/ui/sidebar';

import { getAllProtocols } from '@/lib/dal/queries';

import { SidebarItem, SidebarSubItem } from './sidebar-items';

export async function AppSidebar() {
  const protocols = await getAllProtocols();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Protocols ❤️</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarItem name="New Document" href="/" icon={<FilePlus />} />
              <SidebarItem name="Protocols" href="/protocols" icon={<Inbox />}>
                <SidebarMenuSub>
                  {protocols.map((protocol) => (
                    <SidebarSubItem key={protocol.id} protocol={protocol} />
                  ))}
                </SidebarMenuSub>
              </SidebarItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
