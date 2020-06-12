import styled from 'styled-components/native';
import {Props} from '.';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled(RectButton)<Props>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: ${(props) => props.color};
  elevation: 2;
`;
