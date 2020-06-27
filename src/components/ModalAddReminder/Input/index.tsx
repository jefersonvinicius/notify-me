import React from 'react';
import {Container, TextInput, IconContainer, Button, Placeholder, Value} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInputProps} from 'react-native';

interface Props extends TextInputProps {
  icon?: string;
  onPress?: () => void;
}

export default function Input({onPress, ...props}: Props) {
  return (
    <Container>
      {onPress === undefined ? (
        <TextInput {...props} />
      ) : (
        <Button onPress={onPress}>
          {props.value === '' ? <Placeholder>{props.placeholder}</Placeholder> : <Value>{props.value}</Value>}
        </Button>
      )}
      {props.icon && (
        <IconContainer>
          <Icon name={props.icon} size={20} color="#C9C9C9" />
        </IconContainer>
      )}
    </Container>
  );
}
