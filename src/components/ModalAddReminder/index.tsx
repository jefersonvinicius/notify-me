import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Text} from 'react-native';
import {Container, Title} from './styles';
import Input from './Input';

interface Props {
  visible: boolean;
  onInsertPress: () => void;
  onClose: () => void;
}

export default function ModalAddReminder({visible, onClose, onInsertPress}: Props) {
  const [reminder, setReminder] = useState('');

  return (
    <Modal isVisible={visible} onBackButtonPress={onClose} onBackdropPress={onClose} style={styles.modal}>
      <Container>
        <Title>Novo lembrete</Title>

        <Input value={reminder} onChangeText={setReminder} placeholder="Lembrete" />
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
