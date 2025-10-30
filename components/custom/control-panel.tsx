'use client';

import { useSession } from '@/contexts/session-context';

export default function ControlPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSession();

  if (user.role === 'guest') {
    return null;
  }
  return (
    <div className="bg-background/50 fixed right-2 bottom-2 rounded-lg backdrop-blur-md md:right-4 md:bottom-4">
      <div className="flex gap-2">{children}</div>
    </div>
  );
}
