'use client';

import { AllProtocolsQueryResult } from '@/lib/dal/queries';
import Editor from '@/components/editor/editor';
import { convertDate } from '@/lib/utils';
import Link from 'next/link';

export default function ProtocolsGrid({
  protocols,
}: {
  protocols: AllProtocolsQueryResult[];
}) {
  return (
    <div className="w-full grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4 sm:grid">
      {protocols.map((protocol) => (
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
      className="hover:border-accent-foreground/40 group flex flex-col overflow-hidden rounded-lg border transition-all"
    >
      <h2 className="bg-card/60 group-hover:bg-card flex flex-wrap gap-2 border-b px-4 py-3 transition-colors">
        {protocol.icon} {protocol.name}
      </h2>

      <Editor
        className="h-96 grow overflow-auto border-0"
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
