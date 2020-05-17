import React from 'react';
import {Container, TextInput, IconContainer, Button} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInputProps} from 'react-native';

interface Props extends TextInputProps {
  icon?: string;
  onPress?: () => void;
}

export default function Input(props: Props) {
  console.log(props.onPress);
  return (
    <Container>
      <Button onPress={props.onPress} disabled={props.onPress === undefined}>
        <TextInput {...props} editable={props.onPress === undefined} />
      </Button>
      {props.icon && (
        <IconContainer>
          <Icon name={props.icon} size={20} color="#C9C9C9" />
        </IconContainer>
      )}
    </Container>
  );
}
