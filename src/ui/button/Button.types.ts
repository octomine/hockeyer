import { ReactNode } from 'react';

export type TButtonProps = {
  className?: string;
  disabled?: boolean;
  additional?: boolean;
  children: ReactNode;
  onClick: () => void;
};
