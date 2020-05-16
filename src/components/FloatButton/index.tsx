import React from 'react';
import {Container} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface Props {
  size: number;
  color: string;
  onPress: () => void;
}

export default function FloatButton({size, color, onPress}: Props) {
  return (
    <Container size={size} color={color} onPress={onPress}>
      <Icon name="plus" size={30} color="#fff" />
    </Container>
  );
}
