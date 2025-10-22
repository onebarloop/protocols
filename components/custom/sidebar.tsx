import { Inbox, FilePlus } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
  SidebarTrigger,
  SidebarHeader,
  SidebarSeparator,
} from '@/components/ui/sidebar';

import { getProtocolNavItems } from '@/lib/dal/queries';

import { SidebarItem, SidebarSubItem } from './sidebar-items';

export async function AppSidebar() {
  const protocols = await getProtocolNavItems();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <span className="upper font-thin group-data-[collapsible=icon]:hidden">
          Protocols
        </span>
        <div className="hidden justify-center group-data-[collapsible=icon]:flex">
          ❤️
        </div>
      </SidebarHeader>
      <SidebarSeparator className="!w-auto" />
      <SidebarContent>
        <SidebarGroup>
          {/*     <SidebarGroupLabel>***</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarItem name="New Document" href="/" icon={<FilePlus />} />
              <SidebarItem name="Protocols" href="/protocols" icon={<Inbox />}>
                <SidebarMenuSub className="mr-0 pr-0">
                  {protocols.map((protocol) => (
                    <SidebarSubItem key={protocol.id} protocol={protocol} />
                  ))}
                </SidebarMenuSub>
              </SidebarItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-end">
            <SidebarTrigger />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
