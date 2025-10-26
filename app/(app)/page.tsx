import { DocumentProvider } from '@/lib/context/document-context';
import SaveDocumentButton from '@/components/custom/save-document-button';
import ProtocolConfig from '@/components/custom/protocol-config';
import ControlPanel from '@/components/custom/control-panel';
import EditorWrapper from '@/components/custom/editor-wrapper';

export default async function Home() {
  return (
    <DocumentProvider>
      <section className="max-w-a4 relative mx-auto w-full">
        <div className="mb-8">
          <ProtocolConfig isEditMode />
          <h2 className="text-foreground/50">Create a new document here</h2>
        </div>
        <EditorWrapper />
      </section>
      <ControlPanel>
        <SaveDocumentButton />
      </ControlPanel>
    </DocumentProvider>
  );
}
