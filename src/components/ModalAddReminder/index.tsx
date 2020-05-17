import React, {useState, useCallback} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Switch} from 'react-native';
import {Container, Title, InputGroup, SwitchLabel, Message} from './styles';
import Input from './Input';
import {VerticalMargin} from '../GlobalStyles';
import COLORS from '../../assets/Colors';
import useLayoutAnimation from '../../hooks/useLayoutAnimation';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';

interface Props {
  visible: boolean;
  onInsertPress: () => void;
  onClose: () => void;
}

export default function ModalAddReminder({visible, onClose, onInsertPress}: Props) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [isOngoing, setIsOngoing] = useState(false);
  const [hours, setHours] = useState('');
  const [date, setDate] = useState('');
  const [reminder, setReminder] = useState('');

  const configureNextAnimation = useLayoutAnimation();

  const toggleSwitch = useCallback(() => {
    configureNextAnimation('easeInEaseOut');
    setIsOngoing((prev) => !prev);
  }, [configureNextAnimation]);

  const handleChangeDate = useCallback((_, dateSelected) => {
    setDatePickerVisible(false);
    if (dateSelected) {
      setDate(format(dateSelected, 'dd/MM/yyyy'));
    }
  }, []);

  const handleChangeTime = useCallback((_, dateSelected) => {
    setTimePickerVisible(false);
    if (dateSelected) {
      setHours(format(dateSelected, "'às' HH:mm"));
    }
  }, []);

  return (
    <Modal isVisible={visible} onBackButtonPress={onClose} onBackdropPress={onClose} style={styles.modal}>
      <Container>
        <Title>Novo lembrete</Title>
        <InputGroup>
          <Input value={reminder} onChangeText={setReminder} placeholder="Lembrete" />
        </InputGroup>
        <InputGroup>
          <Input
            icon="calendar"
            value={date}
            placeholder="__/__/__"
            onPress={() => {
              setDatePickerVisible(true);
            }}
          />
          <VerticalMargin margin={2.5} />
          <Input
            icon="clock-outline"
            value={hours}
            placeholder="00:00"
            onPress={() => {
              setTimePickerVisible(true);
            }}
          />
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
        {datePickerVisible && <DateTimePicker mode="date" value={new Date()} onChange={handleChangeDate} />}
        {timePickerVisible && <DateTimePicker mode="time" value={new Date()} onChange={handleChangeTime} />}
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
