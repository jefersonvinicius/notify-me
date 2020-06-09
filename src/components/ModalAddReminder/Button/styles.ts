import styled from 'styled-components/native';
import {Props} from './index';

export const Container = styled.TouchableOpacity<Props>`
  flex: 1;
  background-color: ${(props) => (props.type === 'primary' ? props.color : 'transparent')};
  padding: 10px;
  border-width: ${(props) => (props.type === 'primary' ? 0 : 2)}px;
  border-color: ${(props) => props.color};
`;

export const Text = styled.Text<Props>`
  font-weight: bold;
  text-align: center;
  color: ${(props) => (props.type === 'primary' ? '#fff' : props.color)};
`;
