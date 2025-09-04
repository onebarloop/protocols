'use client';

import DownloadLink from './components/Document';
import Editor from './components/Editor';
import { useState } from 'react';

export default function NewDocument() {
  const [html, setHtml] = useState('my <b>HTML</b>');

  return (
    <>
      <Editor html={html} setHtml={setHtml} />
      <DownloadLink html={html} />
    </>
  );
}
