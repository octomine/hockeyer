import { FC } from 'react';
import { TButtonProps } from './Button.types';
import { Wrapper } from './Button.styled';

const Button: FC<TButtonProps> = ({ disabled = false, children, onClick }) => {
  const clickHandler = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <Wrapper disabled={disabled} onClick={clickHandler}>
      {children}
    </Wrapper>
  );
};

export default Button;
