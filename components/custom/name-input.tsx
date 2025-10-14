'use client';

import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { Pencil, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { useDocument } from '@/lib/context/document-context';

export default function NameInput() {
  const [edited, setEdited] = useState(false);
  const { protocolState, protocolDispatch } = useDocument();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (edited) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [edited]);

  const setName = (event: ChangeEvent<HTMLInputElement>) => {
    protocolDispatch({ type: 'setName', payload: event.target.value });
  };

  const handleClick = () => {
    setEdited(!edited);
  };

  if (!edited) {
    return (
      <div className="flex gap-2">
        <h1 className="text-2xl" onClick={handleClick}>
          {protocolState.name}
        </h1>
        <Button variant="ghost" size="icon" onClick={handleClick}>
          <Pencil />
        </Button>
      </div>
    );
  }
  return (
    <div className="flex gap-2">
      <input
        ref={inputRef}
        className="w-fit-content border-foreground/10 focus:border-foreground/50 border-b bg-transparent text-2xl focus:outline-none"
        value={protocolState.name}
        onChange={(e) => setName(e)}
      />
      <Button variant="ghost" size="icon" onClick={handleClick}>
        <Check />
      </Button>
    </div>
  );
}
