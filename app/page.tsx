import { DocumentProvider } from '@/lib/context/document-context';
import SaveDocumentButton from '@/components/custom/save-document-button';
import NameInput from '@/components/custom/name-input';
import IconSelect from '@/components/custom/icon-select';
import Editor from '@/components/custom/editor/editor';

export default function Home() {
  return (
    <DocumentProvider>
      <section className="max-w-a4 relative mx-auto w-full p-4">
        <div className="mb-8">
          <NameInput />
          <h2 className="text-foreground/50">Create a new document here</h2>
        </div>
        <Editor />
      </section>
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <IconSelect />
        <SaveDocumentButton />
      </div>
    </DocumentProvider>
  );
}
