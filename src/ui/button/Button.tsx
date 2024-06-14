import { FC } from 'react';
import { TButtonProps } from './Button.types';
import { Wrapper } from './Button.styled';

const Button: FC<TButtonProps> = ({ children, onClick }) => {
  return <Wrapper onClick={onClick}>{children}</Wrapper>;
};

export default Button;
