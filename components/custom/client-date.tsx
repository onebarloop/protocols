'use client';

import { useEffect, useState } from 'react';
import { convertDate } from '@/lib/utils';

export default function ClientDate({ date }: { date: Date }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <>{convertDate(date)}</>;
}
