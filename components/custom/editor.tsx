'use client';

import React from 'react';
import ReactEditor from 'react-simple-wysiwyg';
import { cn } from '@/lib/utils';

export default function Editor({
  html,
  setHtml,
  className,
}: {
  html: string | undefined;
  setHtml: (html: string) => void;
  className?: string;
}) {
  function onChange(event: { target: { value: string } }): void {
    setHtml(event.target.value);
  }

  return (
    <div className={cn('editor', className)}>
      <ReactEditor value={html} onChange={onChange} />
    </div>
  );
}
