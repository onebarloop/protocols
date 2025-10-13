'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDocument } from '@/lib/context/document-context';

export default function IconSelect() {
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
            <span className="text-xl">{icon}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
