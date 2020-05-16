import React from 'react';
import {Container, TextInput, IconContainer} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInputProps} from 'react-native';

interface Props extends TextInputProps {
  icon?: string;
}

export default function Input(props: Props) {
  return (
    <Container>
      <TextInput {...props} />
      {props.icon && (
        <IconContainer>
          <Icon name={props.icon} size={20} color="#C9C9C9" />
        </IconContainer>
      )}
    </Container>
  );
}
