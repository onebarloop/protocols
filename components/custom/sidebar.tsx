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

import { SidebarItem, SidebarProtocolsList } from './sidebar-items';

import UserMenu from './user-menu';

export async function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row items-center justify-between gap-2">
        <span className="upper font-thin group-data-[collapsible=icon]:hidden">
          Protocols
        </span>
        <UserMenu />
      </SidebarHeader>
      <SidebarSeparator className="w-auto!" />
      <SidebarContent>
        <SidebarGroup>
          {/*     <SidebarGroupLabel>***</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarItem name="New Document" href="/" icon={<FilePlus />} />
              <SidebarItem name="Protocols" href="/protocols" icon={<Inbox />}>
                <SidebarMenuSub className="mr-0 pr-0">
                  <SidebarProtocolsList />
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
