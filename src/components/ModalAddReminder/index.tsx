import React, {useState, useCallback} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Switch} from 'react-native';
import {Container, Title, InputGroup, SwitchLabel, Message, Controls} from './styles';
import Input from './Input';
import Button from './Button';
import {HorizontalMargin} from '../GlobalStyles';
import COLORS from '../../assets/Colors';
import useLayoutAnimation from '../../hooks/useLayoutAnimation';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';

interface InsertPressResponse {
  description: string;
  date: number;
  ongoing: boolean;
}

interface Props {
  visible: boolean;
  onInsertPress: (data: InsertPressResponse) => void;
  onClose: () => void;
}

export default function ModalAddReminder({visible, onClose, onInsertPress}: Props) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [isOngoing, setIsOngoing] = useState(false);
  const [hours, setHours] = useState(0);
  const [date, setDate] = useState(0);
  const [reminder, setReminder] = useState('');

  const configureNextAnimation = useLayoutAnimation();

  const toggleSwitch = useCallback(() => {
    configureNextAnimation('easeInEaseOut');
    setIsOngoing((prev) => !prev);
  }, [configureNextAnimation]);

  const handleChangeDate = useCallback((_, dateSelected) => {
    setDatePickerVisible(false);
    if (dateSelected) {
      setDate(dateSelected);
    }
  }, []);

  const handleChangeTime = useCallback((_, dateSelected) => {
    setTimePickerVisible(false);
    if (dateSelected) {
      setHours(dateSelected);
    }
  }, []);

  const handleInsertPress = useCallback(() => {
    const dateSelected = new Date(date);
    const hoursSelected = new Date(hours);
    const dateReminder = new Date(
      dateSelected.getFullYear(),
      dateSelected.getMonth(),
      dateSelected.getDate(),
      hoursSelected.getHours(),
      hoursSelected.getMinutes(),
    );

    setIsOngoing(false);
    setHours(0);
    setDate(0);
    setReminder('');

    onInsertPress({
      description: reminder,
      date: dateReminder.getTime(),
      ongoing: isOngoing,
    });
    onClose();
  }, [date, hours, onInsertPress, reminder, onClose, isOngoing]);

  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.modal}
      useNativeDriver>
      <Container>
        <Title>Novo lembrete</Title>
        <InputGroup>
          <Input value={reminder} onChangeText={setReminder} placeholder="Lembrete" />
        </InputGroup>
        <InputGroup>
          <Input
            icon="calendar"
            value={date === 0 ? '' : format(date, 'dd/MM/yyyy')}
            placeholder="__/__/__"
            onPress={() => {
              setDatePickerVisible(true);
            }}
          />
          <HorizontalMargin margin={2.5} />
          <Input
            icon="clock-outline"
            value={hours === 0 ? '' : format(hours, "'às' HH:mm")}
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
        <Controls>
          <Button
            type="secondary"
            color={COLORS.primaryLight}
            title="Fechar"
            onPress={() => {
              onClose();
            }}
          />
          <HorizontalMargin margin={2} />
          <Button type="primary" color={COLORS.primaryLight} title="Adicionar" onPress={handleInsertPress} />
        </Controls>
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
