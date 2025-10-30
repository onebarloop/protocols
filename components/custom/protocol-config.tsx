'use client';

import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { Pencil, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { useDocument } from '@/contexts/document-context';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ProtocolConfig({
  isEditMode,
}: {
  isEditMode?: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const { protocolState, protocolDispatch } = useDocument();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const setName = (event: ChangeEvent<HTMLInputElement>) => {
    protocolDispatch({ type: 'setName', payload: event.target.value });
  };

  const handleClick = () => {
    setIsEditing(!isEditing);
  };

  if (!isEditMode) {
    return (
      <div className="flex h-9 items-center gap-2">
        <span>{protocolState.icon}</span>
        <h1 className="text-2xl">{protocolState.name}</h1>
      </div>
    );
  }

  if (!isEditing) {
    return (
      <div className="flex items-center gap-2">
        <span>{protocolState.icon}</span>
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
    <div className="flex items-center gap-2">
      <span>{protocolState.icon}</span>
      <input
        ref={inputRef}
        className="w-fit-content border-foreground/10 focus:border-foreground/50 border-b bg-transparent text-2xl focus:outline-none"
        value={protocolState.name}
        onChange={(e) => setName(e)}
      />
      <IconSelect />
      <Button variant="ghost" size="icon" onClick={handleClick}>
        <Check />
      </Button>
    </div>
  );
}

function IconSelect() {
  const { protocolDispatch, protocolState } = useDocument();

  const icons = ['🧪', '📄', '📝', '🔬', '📊', '⚗️', '🧬', '🧫', '🧴', '💊'];

  return (
    <Select
      value={protocolState.icon}
      onValueChange={(value) =>
        protocolDispatch({ type: 'setIcon', payload: value })
      }
    >
      <SelectTrigger>
        <SelectValue placeholder="Select icon" />
      </SelectTrigger>
      <SelectContent>
        {icons.map((icon) => (
          <SelectItem key={icon} value={icon}>
            <span className="text-lg">{icon}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
