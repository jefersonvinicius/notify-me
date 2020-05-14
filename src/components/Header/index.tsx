import React from 'react';
import {Container, Title, TitleContainer, AmountReminders} from './styles';

interface Props {
  amountReminders: number;
}

export default function Header({amountReminders}: Props) {
  return (
    <Container>
      <TitleContainer>
        <Title>Notify Me</Title>
        <AmountReminders>{amountReminders} lembretes</AmountReminders>
      </TitleContainer>
    </Container>
  );
}
