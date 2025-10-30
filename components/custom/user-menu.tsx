'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { User, LogOut } from 'lucide-react';

import { Button } from '../ui/button';
import { useSession } from '@/lib/contexts/session-context';
import { Badge } from '../ui/badge';

export default function UserMenu() {
  const { session, user } = useSession();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <User />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-2">
            <h3 className="">Account</h3>
            <Badge>{user.role}</Badge>
            <Button variant="ghost" size="icon" className="ml-auto h-6 w-6">
              <LogOut />
            </Button>
          </div>
          <p className="text-muted-foreground">Welcome {user.name}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
