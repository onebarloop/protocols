'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

export default function SidebarTriggerMobile() {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null;
  }

  return <SidebarTrigger className="fixed bottom-2 left-2 z-10" />;
}
