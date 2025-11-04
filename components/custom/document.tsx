'use client';

import { Document, Page } from '@react-pdf/renderer';
import HTMLSTYLESHEET from '@/styles/pdf-stylesheet';
import Html from 'react-pdf-html';

import dynamic from 'next/dynamic';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
  },
);

const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  {
    ssr: false,
  },
);

function PDF({ html, title }: { html: string; title?: string }) {
  return (
    <Document title={title}>
      <Page size="A4" orientation="portrait" style={{ padding: 20 }}>
        <Html stylesheet={HTMLSTYLESHEET}>{html}</Html>
      </Page>
    </Document>
  );
}

function DownloadLink({ html }: { html?: string }) {
  if (!html) {
    return null;
  }
  return (
    <div>
      <PDFDownloadLink
        key={html}
        document={<PDF html={html} />}
        fileName="somename.pdf"
      >
        {({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
      </PDFDownloadLink>
    </div>
  );
}

function Viewer({ html, title }: { html?: string; title?: string }) {
  if (!html) {
    return null;
  }
  return (
    <PDFViewer key={html} className="h-full w-full">
      <PDF title={title} html={html} />
    </PDFViewer>
  );
}

export { DownloadLink, Viewer };
