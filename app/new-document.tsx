'use client';

import Editor from './_components/editor';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { saveNewProtocol } from '../lib/server-actions/save';

export default function NewDocument() {
  const [html, setHtml] = useState('my <b>HTML</b>');

  const handleSave = async () => {
    const result = await saveNewProtocol({ name: 'New Protocol', html });
    console.log(result);
  };

  return (
    <>
      <Editor html={html} setHtml={setHtml} />
      <Button onClick={handleSave}>Save</Button>
    </>
  );
}
