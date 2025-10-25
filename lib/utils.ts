import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  uniqueNamesGenerator,
  Config,
  colors,
  animals,
  names,
} from 'unique-names-generator';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function convertDate(date: Date): string {
  return new Date(date).toLocaleTimeString([], {
    minute: '2-digit',
    hour: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
}

function createRandomName(
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
      separator: '',
    };
  }

  return uniqueNamesGenerator(customConfig);
}

export { convertDate, cn, createRandomName };
