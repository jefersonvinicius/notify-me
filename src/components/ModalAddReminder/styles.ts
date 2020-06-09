import styled from 'styled-components/native';
import COLORS from '../../assets/Colors';

export const Container = styled.View`
  padding: 10px;
  background-color: #fff;
`;

export const Title = styled.Text`
  color: ${COLORS.primaryLight};
  font-size: 20px;
`;

export const SwitchLabel = styled.Text`
  font-size: 14px;
  color: #999;
`;

export const InputGroup = styled.View`
  margin-top: 5px;
  flex-direction: row;
  align-items: center;
`;

export const Message = styled.Text`
  border-left-width: 3px;
  border-left-color: #999;
  color: #888;
  padding: 5px 5px 5px 10px;
  font-size: 12px;
`;

export const Controls = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;
