import { FC } from 'react';
import { TButtonProps } from './Button.types';
import { Wrapper } from './Button.styled';

const Button: FC<TButtonProps> = ({
  className,
  disabled = false,
  additional = false,
  children,
  onClick,
}) => {
  const clickHandler = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <Wrapper
      className={className}
      additional={additional}
      disabled={disabled}
      onClick={clickHandler}
    >
      {children}
    </Wrapper>
  );
};

export default Button;
