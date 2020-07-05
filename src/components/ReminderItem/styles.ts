import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

interface IReminderDisplayed {
  isDisplayed: boolean;
}

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
  padding: 10px;
`;

export const InfoContainer = styled.View<IReminderDisplayed>`
  opacity: ${(props) => (props.isDisplayed ? 0.5 : 1)};
`;

export const Description = styled.Text<IReminderDisplayed>`
  font-size: 16px;
  margin-bottom: 5px;
  color: #444;
  opacity: ${(props) => (props.isDisplayed ? 0.5 : 1)};
  text-decoration-line: ${(props) => (props.isDisplayed ? 'line-through' : 'none')};
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

export const DescriptionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
