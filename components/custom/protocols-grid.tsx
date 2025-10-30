'use client';

import { AllProtocolsQueryResult } from '@/dal/queries';
import Editor from '@/components/editor/editor';
import Link from 'next/link';
import { use, useMemo } from 'react';
import { convertDate } from '@/utils';
import { useProtocols } from '@/contexts/protocols-context';

export default function ProtocolsGrid({
  protocolsPromise,
}: {
  protocolsPromise: Promise<AllProtocolsQueryResult[]>;
}) {
  const protocols = use(protocolsPromise);
  const { optimisticProtocols } = useProtocols();

  const visibleProtocols = useMemo(() => {
    const contextIds = new Set(optimisticProtocols.map((p) => p.id));
    return protocols.filter((p) => contextIds.has(p.id));
  }, [protocols, optimisticProtocols]);

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
      {visibleProtocols.map((protocol) => (
        <ProtocolCard key={protocol.id} protocol={protocol} />
      ))}
    </div>
  );
}

function ProtocolCard({ protocol }: { protocol: AllProtocolsQueryResult }) {
  return (
    <Link
      href={`/protocols/${protocol.id}`}
      key={protocol.id}
      prefetch={true}
      className="hover:border-accent-foreground/40 group flex flex-col overflow-hidden rounded-lg border shadow transition-all"
    >
      <h2 className="bg-card/60 group-hover:bg-card flex flex-wrap gap-2 border-b px-4 py-3 transition-colors">
        {protocol.icon} {protocol.name}
      </h2>

      <Editor
        className="h-96 grow overflow-auto border-0 shadow-none"
        editable={false}
        editorSerializedState={protocol.serializedState}
      />
      <div className="flex flex-wrap justify-between gap-x-4 border-t px-4 py-2">
        <p className="text-muted-foreground text-xs">
          {convertDate(protocol.createdAt)}
        </p>
        <p className="text-muted-foreground text-xs">
          by {protocol.author?.name || 'deleted user'}
        </p>
      </div>
    </Link>
  );
}
