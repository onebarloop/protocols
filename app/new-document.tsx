'use client';

import Editor from './_components/editor';
import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { saveNewProtocol } from '../lib/server-actions/save';
import { toast } from 'sonner';
import { start } from 'repl';

export default function NewDocument() {
  const [html, setHtml] = useState('my <b>HTML</b>');
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      const result = await saveNewProtocol({ name: 'New Protocol', html });
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="w-fit mx-auto">
      <Editor html={html} setHtml={setHtml} />
      <Button disabled={isPending} onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}
