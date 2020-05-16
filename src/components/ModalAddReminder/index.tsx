import React, {useState, useCallback} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Switch} from 'react-native';
import {Container, Title, InputGroup, SwitchLabel, Message} from './styles';
import Input from './Input';
import {VerticalMargin} from '../GlobalStyles';
import COLORS from '../../assets/Colors';
import useLayoutAnimation from '../../hooks/useLayoutAnimation';

interface Props {
  visible: boolean;
  onInsertPress: () => void;
  onClose: () => void;
}

export default function ModalAddReminder({visible, onClose, onInsertPress}: Props) {
  const [isOngoing, setIsOngoing] = useState(false);
  const [reminder, setReminder] = useState('');

  const configureNextAnimation = useLayoutAnimation();

  const toggleSwitch = useCallback(() => {
    configureNextAnimation('easeInEaseOut');
    setIsOngoing((prev) => !prev);
  }, [configureNextAnimation]);

  return (
    <Modal isVisible={visible} onBackButtonPress={onClose} onBackdropPress={onClose} style={styles.modal}>
      <Container>
        <Title>Novo lembrete</Title>
        <InputGroup>
          <Input value={reminder} onChangeText={setReminder} placeholder="Lembrete" />
        </InputGroup>
        <InputGroup>
          <Input icon="calendar" placeholder="__/__/__" />
          <VerticalMargin margin={2.5} />
          <Input icon="clock-outline" placeholder="00:00" />
        </InputGroup>
        <InputGroup>
          <Switch
            trackColor={{true: COLORS.secondaryLigth, false: '#9e9e9e'}}
            thumbColor={isOngoing ? COLORS.primaryLight : '#f4f3f4'}
            value={isOngoing}
            onValueChange={toggleSwitch}
          />
          <SwitchLabel>lembrete fixo</SwitchLabel>
        </InputGroup>
        {isOngoing && <Message>Lembretes fixos ficam na área de notificações até você seleciona-los</Message>}
      </Container>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
});
