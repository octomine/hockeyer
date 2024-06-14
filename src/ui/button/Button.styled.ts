import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 0.5em 2em;
  border: 2px solid #cccccc;
  border-radius: 4px;
  background: white;
  box-shadow: 0 2px 4px #00000022;

  transition: all 0.3s;

  &:active {
    box-shadow: 0 0 2px #00000022;
    transform: translateY(2px);
  }
`;
