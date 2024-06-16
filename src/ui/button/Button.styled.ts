import styled, { css } from 'styled-components';

const active = css`
  box-shadow: 0 1px 4px #00000022;

  &:active {
    box-shadow: 0 0 2px #00000022;
    transform: translateY(4px);
  }
`;

export const Wrapper = styled.div<{ disabled: boolean; additional: boolean }>`
  padding: 0.5em 2em;
  border: 2px solid;
  border-color: ${({ theme }) => theme.color.border.button};
  border-radius: 4px;
  background: ${({ theme, additional }) =>
    additional
      ? theme.color.background.additional
      : theme.color.background.main};
  opacity: ${({ disabled }) => (disabled ? 0.37 : 1)};
  color: ${({ theme, additional }) =>
    additional ? theme.color.label.additional : theme.color.label.main};

  transition: all 0.2s;

  ${({ disabled }) => !disabled && active}
`;
