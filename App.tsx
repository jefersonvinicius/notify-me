import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Header from './src/components/Header';
import FloatButton from './src/components/FloatButton';
import COLORS from './src/assets/Colors';
import {EmptyListContainer, EmptyListMessage} from './src/components/AppStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ModalAddReminder from './src/components/ModalAddReminder';
import ReminderItem from './src/components/ReminderItem';
import useLayoutAnimation from './src/hooks/useLayoutAnimation';
import Notification from './src/services/Notification';

export interface INotification {
  id: number;
  description: string;
  date: number;
  ongoing: boolean;
  cancelled: boolean;
  displayed: boolean;
}

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([
    {
      id: Math.random(),
      date: Date.now(),
      description: 'Teste',
      ongoing: false,
      cancelled: false,
      displayed: false,
    },
    {
      id: Math.random(),
      date: Date.now(),
      description: 'Teste',
      ongoing: false,
      cancelled: false,
      displayed: false,
    },
  ]);

  const configureNextAnimation = useLayoutAnimation();

  useEffect(() => {
    Notification.configure((notification) => {
      console.log(notification.data);
    });
  }, []);

  const renderListEmpty = useCallback(() => {
    return (
      <EmptyListContainer>
        <Icon name="notifications" size={80} color="#aaa" />
        <EmptyListMessage>Nenhum lembrete</EmptyListMessage>
      </EmptyListContainer>
    );
  }, []);

  const handleInsertNotification = useCallback((data) => {
    const notification: INotification = {
      id: Math.floor(Math.random() * 1000),
      description: data.description,
      date: data.date,
      ongoing: data.ongoing,
      cancelled: false,
      displayed: false,
    };
    Notification.notifySchedule(notification);
    setNotifications((prev: INotification[]) => [...prev, notification]);
  }, []);

  const handleReminderDeletion = useCallback(
    (reminderId: number) => {
      const filtered = notifications.filter((notification) => notification.id !== reminderId);
      Notification.cancelNofication(reminderId.toString());
      configureNextAnimation('easeInEaseOut');
      setNotifications([...filtered]);
    },
    [configureNextAnimation, notifications],
  );

  const renderItemList = useCallback(
    ({item}) => {
      return <ReminderItem data={item} onDeletePress={() => handleReminderDeletion(item.id)} />;
    },
    [handleReminderDeletion],
  );

  return (
    <View style={styles.container}>
      <Header amountReminders={notifications.length} />
      <FlatList
        data={notifications}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItemList}
        ListEmptyComponent={renderListEmpty}
      />
      <ModalAddReminder
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        onInsertPress={handleInsertNotification}
      />
      <FloatButton
        size={50}
        color={COLORS.primaryLight}
        onPress={() => {
          setModalVisible(true);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    flexGrow: 1,
    // marginHorizontal: 10,
  },
});
