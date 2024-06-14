import styled, { css } from 'styled-components';

const active = css`
  &:active {
    box-shadow: 0 0 2px #00000022;
    transform: translateY(4px);
  }
`;

export const Wrapper = styled.div<{ disabled: boolean }>`
  padding: 0.5em 2em;
  border: 2px solid #cccccc;
  border-radius: 4px;
  background: white;
  box-shadow: 0 2px 4px #00000022;
  opacity: ${({ disabled }) => (disabled ? 0.37 : 1)};
  color: ${({ disabled }) => (disabled ? '#aaaaaa' : 'black')};

  transition: all 0.2s;

  ${({ disabled }) => !disabled && active}
`;
