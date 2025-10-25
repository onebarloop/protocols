import { getProtocolById } from '@/lib/dal/queries';
import { notFound } from 'next/navigation';
import { DocumentProvider } from '@/lib/context/document-context';
import SaveDocumentButton from '@/components/custom/save-document-button';
import Link from 'next/link';
import { Pencil, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProtocolConfig from '@/components/custom/protocol-config';
import ControlPanel from '@/components/custom/control-panel';
import { getSession } from '@/lib/auth/get-session';
import { redirect } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import EditorWrapper from '@/components/custom/editor-wrapper';

export default async function ProtocolPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ edit?: string }>;
}) {
  const { user } = await getSession();
  const { id } = await params;
  const { edit } = await searchParams;
  const isGuest = user.role === 'guest';
  const isEditMode = edit === 'true';

  const protocol = await getProtocolById(id);

  if (!protocol) {
    notFound();
  }

  if (isGuest && isEditMode) {
    redirect(`/protocols/${id}`);
  }

  return (
    <DocumentProvider documentState={protocol}>
      <section className="max-w-a4 relative mx-auto w-full">
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
        <EditorWrapper
          editable={isEditMode}
          editorSerializedState={protocol.serializedState}
        />
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
        ) : isGuest ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <span tabIndex={0}>
                <Button variant="outline" disabled>
                  <Pencil />
                  Edit protocol
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit disabled as guest</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button variant="outline" asChild>
            <Link href={`/protocols/${id}?edit=true`}>
              <Pencil />
              Edit protocol
            </Link>
          </Button>
        )}
      </ControlPanel>
    </DocumentProvider>
  );
}
