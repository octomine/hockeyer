import { ReactNode } from 'react';

export type TButtonProps = {
  className?: string;
  disabled?: boolean;
  children: ReactNode;
  onClick: () => void;
};
