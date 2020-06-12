import React, {useCallback} from 'react';
import {Container, InfoContainer, DateLabel, Description, DateContainer, IconContainer, DeleteButton} from './styles';
import {format} from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {INotification} from '../../../App';
import {HorizontalMargin} from '../GlobalStyles';
import Swipeable from 'react-native-gesture-handler/Swipeable';

interface Props {
  data: INotification;
}

export default function ReminderItem({data}: Props) {
  const renderRightActions = useCallback(() => {
    return (
      <DeleteButton>
        <Icon name="delete" size={20} color="#fff" />
      </DeleteButton>
    );
  }, []);

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Container>
        <InfoContainer>
          <Description>{data.description}</Description>
          <DateContainer>
            <IconContainer>
              <Icon name="calendar" size={18} color="#777" />
              <DateLabel>{format(data.date, 'dd/MM/yyyy')}</DateLabel>
            </IconContainer>
            <HorizontalMargin margin={5} />
            <IconContainer>
              <Icon name="clock-outline" size={18} color="#777" />
              <DateLabel>{format(data.date, 'HH:mm')}</DateLabel>
            </IconContainer>
          </DateContainer>
        </InfoContainer>
      </Container>
    </Swipeable>
  );
}
