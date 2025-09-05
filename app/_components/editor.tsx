'use client';

import React from 'react';
import ReactEditor from 'react-simple-wysiwyg';

export default function Editor({
  html,
  setHtml,
}: {
  html: string;
  setHtml: (html: string) => void;
}) {
  function onChange(event: { target: { value: string } }): void {
    setHtml(event.target.value);
  }

  return (
    <div className="editor w-fit">
      <ReactEditor className="w-a4 h-a4" value={html} onChange={onChange} />
    </div>
  );
}
