import { getProtocolById } from '@/lib/dal/queries';
import { notFound } from 'next/navigation';
import Editor from '@/components/editor/editor';
import { DocumentProvider } from '@/lib/context/document-context';
import SaveDocumentButton from '@/components/custom/save-document-button';
import Link from 'next/link';
import { Pencil, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { is } from 'drizzle-orm';

export default async function ProtocolPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ edit?: string }>;
}) {
  const { id } = await params;
  const { edit } = await searchParams;

  const isEditMode = edit === 'true';

  const protocol = await getProtocolById(id);

  if (!protocol) {
    notFound();
  }

  return (
    <DocumentProvider documentState={protocol}>
      <section className="max-w-a4 mx-auto flex h-full w-full flex-col p-4">
        <div className="mb-8">
          <h1 className="text-2xl">{protocol.name}</h1>
          <div className="flex items-center gap-4">
            <h2 className="text-foreground/50">Edit document</h2>
          </div>
        </div>
        <div className="h-full max-h-full min-h-0">
          <Editor readonly={!isEditMode} editorSerializedState={protocol.serializedState} />
        </div>
      </section>
      <div className="fixed right-10 bottom-10">
        {isEditMode ? (
          <div className="flex gap-2">
            <SaveDocumentButton />
            <Button variant="destructive" size="icon" asChild>
              <Link href={`/protocols/${id}`}>
                <X />
              </Link>
            </Button>
          </div>
        ) : (
          <Button variant="secondary" asChild>
            <Link href={`/protocols/${id}?edit=true`}>
              <Pencil size={32} />
              <span>Edit protocol</span>
            </Link>
          </Button>
        )}
      </div>
    </DocumentProvider>
  );
}
