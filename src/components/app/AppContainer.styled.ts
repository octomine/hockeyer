import { WrapperV } from '@app/style';
import { Button } from '@app/ui';
import styled from 'styled-components';

export const Wrapper = styled(WrapperV)`
  position: relative;
  height: 100vh;
`;

export const UIHolder = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: none;
`;

export const OptsButton = styled(Button)`
  position: absolute;
  padding: 0.5em;
  width: 20px;
  height: 20px;
  right: 10px;
  top: 30px;
  border-radius: 50%;
`;
