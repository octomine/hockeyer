import { FC } from 'react';
import { TLabelProps } from './Label.types';
import { Wrapper } from './Label.styled';

const Label: FC<TLabelProps> = ({
  children,
  additional = false,
  size = 'm',
  className,
}) => {
  return (
    <Wrapper className={className} additional={additional} size={size}>
      {children}
    </Wrapper>
  );
};

export default Label;
