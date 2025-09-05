import NewDocument from './new-document';
import { DocumentProvider } from './_contexts/document-context';
import SaveDocumentButton from './_components/save-document-button';

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
