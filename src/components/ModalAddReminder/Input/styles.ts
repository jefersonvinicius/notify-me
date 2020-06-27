import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 0 5px 0 5px;
  border: 1px solid #c9c9c9;
  border-radius: 10px;
  max-height: 50px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
`;

export const IconContainer = styled.View``;

export const Button = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
`;

export const Placeholder = styled.Text`
  color: #aaa;
  padding: 15px 0 15px 0;
  font-size: 16px;
`;

export const Value = styled.Text`
  color: #333;
  padding: 15px 0 15px 0;
  font-size: 16px;
`;
