import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  uniqueNamesGenerator,
  Config,
  colors,
  animals,
  names,
} from 'unique-names-generator';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createRandomName(
  { type }: { type: 'animals' | 'names' } = { type: 'animals' },
) {
  let customConfig: Config = { dictionaries: [] };
  if (type === 'names') {
    customConfig = {
      dictionaries: [names],
    };
  }
  if (type === 'animals') {
    customConfig = {
      dictionaries: [colors, animals],
      style: 'capital',
      separator: '*',
    };
  }

  return uniqueNamesGenerator(customConfig);
}
