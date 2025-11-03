import {
  Bird,
  Fish,
  Bug,
  Squirrel,
  Turtle,
  Snail,
  type LucideProps,
} from 'lucide-react';

import { type Icon, IconSchema } from '@/types/zod-schemas';

type IconProps = LucideProps & {
  component?: Icon;
};

export function Icon(props: IconProps) {
  const iconMap = {
    bird: Bird,
    fish: Fish,
    bug: Bug,
    squirrel: Squirrel,
    turtle: Turtle,
    snail: Snail,
  } as const;

  const validateIcon = IconSchema.safeParse(props.component);
  if (!validateIcon.success) {
    return <Bird {...props} />;
  }

  const Component = iconMap[validateIcon.data];
  return <Component {...props} />;
}
