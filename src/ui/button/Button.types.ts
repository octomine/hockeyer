import { ReactNode } from 'react';

export type TButtonProps = {
  disabled?: boolean;
  children: ReactNode;
  onClick: () => void;
};
