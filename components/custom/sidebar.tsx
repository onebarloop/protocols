import { Inbox, Home } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuSub,
} from '@/components/ui/sidebar';

import { getAllProtocols } from '@/db/queries/select';

import { SidebarItem, SidebarSubItem } from './sidebar-items';

export async function AppSidebar() {
  const protocols = await getAllProtocols();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarItem name="Home" href="/" icon={<Home />} />
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
