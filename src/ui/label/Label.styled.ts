import styled from 'styled-components';
import { TSizes } from './Label.types';

export const Wrapper = styled.div<{ size: TSizes; additional: boolean }>`
  color: ${({ theme, additional }) =>
    additional ? theme.color.label.additional : theme.color.label.main};
  font-size: ${({ theme, size }) => theme.size[size]};
  font-weight: 500;
`;
