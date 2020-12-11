import styled from 'styled-components';

export const Input = styled.input`
  display: block;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border: ${(props) => (props.redBorder ? '1px solid red' : '1px soled grey')};
`;

export const P = styled.p`
  color: ${(props) => (props.warn ? 'red' : 'inherit')};
  font-size: ${(props) => (props.warn ? '12px' : 'inherit')};
`;
