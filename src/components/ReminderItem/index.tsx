import React, {useCallback, useMemo, useState} from 'react';
import {
  Container,
  InfoContainer,
  DateLabel,
  Description,
  DateContainer,
  IconContainer,
  DeleteButton,
  DescriptionContainer,
  DistanceLabel,
} from './styles';
import {format, isAfter} from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OIcon from 'react-native-vector-icons/Octicons';
import {INotification} from '../../../App';
import {HorizontalMargin} from '../GlobalStyles';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {formatDistanceToNowStrict} from 'date-fns/esm';
import {pt} from 'date-fns/locale';
import useLayoutAnimation from '../../hooks/useLayoutAnimation';

interface Props {
  data: INotification;
  onDeletePress: () => void;
}

export default function ReminderItem({data, onDeletePress}: Props) {
  const [showDistance, setShowDistance] = useState(false);
  const configureAnimation = useLayoutAnimation();

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

  const toggleDistanceTime = useCallback(() => {
    configureAnimation('easeInEaseOut');
    setShowDistance((state) => !state);
  }, [configureAnimation]);

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Container onPress={toggleDistanceTime}>
        <InfoContainer isDisplayed={isDisplayed}>
          <DescriptionContainer>
            <Description isDisplayed={isDisplayed} numberOfLines={showDistance ? 1000 : 1}>
              {data.description}
            </Description>
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
          {showDistance && (
            <IconContainer>
              <DistanceLabel>{formatDistanceToNowStrict(data.date, {addSuffix: true, locale: pt})}</DistanceLabel>
            </IconContainer>
          )}
        </InfoContainer>
      </Container>
    </Swipeable>
  );
}
