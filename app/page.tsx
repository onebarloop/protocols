import NewDocument from './new-document';
import { DocumentProvider } from '@/lib/context/document-context';
import SaveDocumentButton from '@/components/custom/save-document-button';

export default function Home() {
  return (
    <DocumentProvider>
      <NewDocument />
      <div className="absolute right-4 bottom-4 z-10">
        <SaveDocumentButton />
      </div>
    </DocumentProvider>
  );
}
