import { ReactNode } from 'react';

export type TSizes = 's' | 'm' | 'l';

export type TLabelProps = {
  children: ReactNode;
  className?: string;
  additional?: boolean;
  size?: TSizes;
};
