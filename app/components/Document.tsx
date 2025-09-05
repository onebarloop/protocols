'use client';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import HTMLSTYLESHEET from '../styles/pdf-stylesheet';
import Html from 'react-pdf-html';

import dynamic from 'next/dynamic';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
  }
);

const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  {
    ssr: false,
  }
);

function PDF({ html }: { html: string }) {
  return (
    <Document>
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
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download now!'
        }
      </PDFDownloadLink>
    </div>
  );
}

function Viewer({ html }: { html?: string }) {
  if (!html) {
    return null;
  }
  return (
    <div style={{ height: '100vh' }}>
      <PDFViewer key={html} width="100%" height="100%">
        <PDF html={html} />
      </PDFViewer>
    </div>
  );
}

export { DownloadLink, Viewer };
