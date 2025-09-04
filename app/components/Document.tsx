'use client';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import Html from 'react-pdf-html';

import dynamic from 'next/dynamic';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
  }
);

const stylesheet = {
  ul: {
    listStyleType: 'disc',
    paddingLeft: 20,
  },
  ol: {
    listStyleType: 'decimal',
    paddingLeft: 20,
  },
  h1: { fontSize: 24, marginBottom: 10, fontWeight: 'normal' },
  h2: { fontSize: 20, marginBottom: 10, fontWeight: 'normal' },
  h3: { fontSize: 18, marginBottom: 10, fontWeight: 'normal' },
};

// Create Document Component
function PDF({ html }: { html: string }) {
  return (
    <Document>
      <Page size="A4" orientation="portrait" style={{ padding: 20 }}>
        <Html stylesheet={stylesheet}>{html}</Html>
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

export default DownloadLink;
