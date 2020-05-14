import React from 'react';
import {Container} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface Props {
  size: number;
  color: string;
}

export default function FloatButton({size, color}: Props) {
  return (
    <Container size={size} color={color}>
      <Icon name="plus" size={30} color="#fff" />
    </Container>
  );
}
