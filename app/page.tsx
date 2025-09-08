import NewDocument from './new-document';
import { DocumentProvider } from '@/lib/context/document-context';
import SaveDocumentButton from '@/components/custom/save-document-button';

export default function Home() {
  return (
    <DocumentProvider>
      <section className="max-w-a4 mx-auto flex h-full w-full flex-col">
        <div className="mb-8">
          <h1 className="text-2xl">New Document</h1>
          <h2 className="text-foreground/50">Create a new document here</h2>
        </div>
        <div className="h-full max-h-full min-h-0">
          <NewDocument />
        </div>
      </section>
      <div className="absolute top-4 right-4 z-10">
        <SaveDocumentButton />
      </div>
    </DocumentProvider>
  );
}
