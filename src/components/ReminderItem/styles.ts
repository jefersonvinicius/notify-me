import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const DeleteButton = styled(RectButton)`
  background-color: #ef5350;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const DeleteText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const Container = styled(RectButton)`
  background-color: #fff;
  /* border-top-color: #ccc;
  border-bottom-color: #ccc;
  border-top-width: 1px;
  border-bottom-width: 1px; */
  padding: 10px;
`;

export const InfoContainer = styled.View``;

export const Description = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  color: #444;
`;

export const IconContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DateContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DateLabel = styled.Text`
  font-size: 12px;
  margin-left: 2.5px;
  color: #444;
`;

export const ControlsContainer = styled.View``;
