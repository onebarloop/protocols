'use client';

import { DownloadLink } from './_components/document';
import Editor from './_components/editor';
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
