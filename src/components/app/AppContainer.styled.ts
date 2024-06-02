import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
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

export const OptsButton = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: pink;
  right: 10px;
  top: 30px;
`;

export const TButton = styled.div`
  background: white;
`;
