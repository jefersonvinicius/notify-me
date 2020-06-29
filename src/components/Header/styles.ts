import styled from 'styled-components/native';
import COLORS from '../../assets/Colors';

export const Container = styled.View`
  flex-direction: row;
  margin: 10px;
`;

export const TitleContainer = styled.View``;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${COLORS.primaryLight};
`;

export const AmountReminders = styled.Text`
  margin-top: -4px;
  color: ${COLORS.primaryLight};
  font-size: 13px;
`;
