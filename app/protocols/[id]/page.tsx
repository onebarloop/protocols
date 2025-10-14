import { getProtocolById } from '@/lib/dal/queries';
import { Viewer } from '@/components/custom/document';
import { notFound } from 'next/navigation';
import Editor from '@/components/custom/editor/editor-new';

export default async function ProtocolPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const protocol = await getProtocolById(id);

  if (!protocol) {
    notFound();
  }

  return (
    <section className="max-w-a4 mx-auto flex h-full w-full flex-col p-4">
      <div className="mb-8">
        <h1 className="text-2xl">{protocol.name}</h1>
        <h2 className="text-foreground/50">Edit document</h2>
      </div>
      <div className="h-full max-h-full min-h-0">
        <Editor editorSerializedState={protocol.serializedState} />
      </div>
    </section>
  );
}
