import { getAllProtocols } from '@/dal/queries';
import ProtocolsGrid from '@/components/custom/protocols-grid';
import { Suspense } from 'react';
import GridSkeleton from '@/app/(app)/protocols/grid-skeleton';

export default async function ProtocolsPage() {
  const protocols = getAllProtocols();

  return (
    <section className="max-w-8xl mx-auto">
      <h1 className="mb-6 text-2xl">Protocols Overview</h1>
      <Suspense fallback={<GridSkeleton />}>
        <ProtocolsGrid protocols={protocols} />
      </Suspense>
    </section>
  );
}
