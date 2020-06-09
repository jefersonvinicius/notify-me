import React from 'react';
import {Container, Text} from './styles';

export interface Props {
  type: 'primary' | 'secondary';
  color: string;
  title?: string;
  onPress?: () => void;
}

export default function Button({type, color, title, onPress}: Props) {
  return (
    <Container type={type} color={color} onPress={onPress}>
      <Text type={type} color={color}>
        {title}
      </Text>
    </Container>
  );
}
