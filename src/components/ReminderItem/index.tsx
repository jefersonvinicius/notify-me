import React, {useCallback, useMemo} from 'react';
import {
  Container,
  InfoContainer,
  DateLabel,
  Description,
  DateContainer,
  IconContainer,
  DeleteButton,
  DescriptionContainer,
} from './styles';
import {format, isAfter} from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OIcon from 'react-native-vector-icons/Octicons';
import {INotification} from '../../../App';
import {HorizontalMargin} from '../GlobalStyles';
import Swipeable from 'react-native-gesture-handler/Swipeable';

interface Props {
  data: INotification;
  onDeletePress: () => void;
}

export default function ReminderItem({data, onDeletePress}: Props) {
  const isDisplayed = useMemo(() => {
    return isAfter(Date.now(), data.date);
  }, [data]);

  const renderRightActions = useCallback(() => {
    return (
      <DeleteButton onPress={onDeletePress}>
        <Icon name="delete" size={20} color="#fff" />
      </DeleteButton>
    );
  }, [onDeletePress]);

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Container>
        <InfoContainer isDisplayed={isDisplayed}>
          <DescriptionContainer>
            <Description isDisplayed={isDisplayed}>{data.description}</Description>
            {data.ongoing && <OIcon name="pin" size={15} color="#777" />}
          </DescriptionContainer>
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
