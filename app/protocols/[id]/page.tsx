import { getProtocolById } from '@/lib/dal/queries';
import { notFound } from 'next/navigation';
import Editor from '@/components/editor/editor';
import { DocumentProvider } from '@/lib/context/document-context';
import SaveDocumentButton from '@/components/custom/save-document-button';
import Link from 'next/link';
import { Pencil, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProtocolConfig from '@/components/custom/protocol-config';
import ControlPanel from '@/components/custom/control-panel';

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
          <ProtocolConfig isEditMode={isEditMode} />
          <p className="text-foreground/50 text-sm">
            {new Date(protocol.createdAt).toLocaleTimeString([], {
              minute: '2-digit',
              hour: '2-digit',
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            })}
            <br />© by{' '}
            {protocol.author?.name ? protocol.author.name : 'anonymous'}
            {protocol.editor?.name
              ? ` | Edited by ${protocol.editor.name}`
              : ''}
          </p>
        </div>
        <div className="h-full max-h-full min-h-0">
          <Editor
            editable={isEditMode}
            editorSerializedState={protocol.serializedState}
          />
        </div>
      </section>
      <ControlPanel>
        {isEditMode ? (
          <>
            <SaveDocumentButton />
            <Button variant="outline" size="icon" asChild>
              <Link href={`/protocols/${id}`}>
                <X />
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" asChild>
              <Link href={`/protocols/${id}?edit=true`}>
                <Pencil />
                Edit protocol
              </Link>
            </Button>
          </>
        )}
      </ControlPanel>
    </DocumentProvider>
  );
}
