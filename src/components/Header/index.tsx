import React from 'react';
import {Container, Title, TitleContainer, AmountReminders} from './styles';
import {ActivityIndicator} from 'react-native';
import COLORS from '../../assets/Colors';

interface Props {
  amountReminders: number;
  loading?: boolean;
}

export default function Header({amountReminders, loading}: Props) {
  return (
    <Container>
      <TitleContainer>
        <Title>Notify Me</Title>
        {loading ? (
          <AmountReminders>Carregando...</AmountReminders>
        ) : (
          <AmountReminders>
            {amountReminders} {amountReminders === 1 ? 'lembrete' : 'lembretes'}
          </AmountReminders>
        )}
      </TitleContainer>
    </Container>
  );
}
