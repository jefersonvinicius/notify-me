import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import Header from './src/components/Header';
import FloatButton from './src/components/FloatButton';
import COLORS from './src/assets/Colors';
import {EmptyListContainer, EmptyListMessage} from './src/components/AppStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ModalAddReminder from './src/components/ModalAddReminder';
import ReminderItem from './src/components/ReminderItem';
import useLayoutAnimation from './src/hooks/useLayoutAnimation';
import Notification from './src/services/Notification';
import {getReminders, storeReminders} from './src/services/storage';
import {isAfter} from 'date-fns';

export interface INotification {
  id: number;
  description: string;
  date: number;
  ongoing: boolean;
  displayed: boolean;
}

Notification.configure((notification) => {
  console.log('Notification received!');
  console.log(notification);
});

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [reminders, setReminders] = useState<INotification[] | null>(null);
  const [loading, setLoading] = useState(true);

  const configureNextAnimation = useLayoutAnimation();

  useEffect(() => {
    async function prepareReminders() {
      const remindersFromStorage = await getReminders();
      const remindersDisplayed: INotification[] = [];
      const remindersNotDisplayed: INotification[] = [];
      remindersFromStorage.forEach((reminder) => {
        if (isAfter(Date.now(), reminder.date)) {
          remindersDisplayed.push(reminder);
        } else {
          remindersNotDisplayed.push(reminder);
        }
      });
      setReminders([...remindersNotDisplayed, ...remindersDisplayed]);
      configureNextAnimation('easeInEaseOut');
      setLoading(false);
    }

    prepareReminders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reminders !== null) {
      storeReminders(reminders);
    }
  }, [reminders]);

  const renderListEmpty = useCallback(() => {
    return (
      <EmptyListContainer>
        {loading ? (
          <ActivityIndicator size={40} color={COLORS.primaryLight} />
        ) : (
          <>
            <Icon name="notifications" size={80} color="#aaa" />
            <EmptyListMessage>Nenhum lembrete</EmptyListMessage>
          </>
        )}
      </EmptyListContainer>
    );
  }, [loading]);

  const handleInsertNotification = useCallback(
    (data) => {
      const notification: INotification = {
        id: Math.floor(Math.random() * 1000),
        description: data.description,
        date: data.date,
        ongoing: data.ongoing,
        displayed: false,
      };
      Notification.notifySchedule(notification);
      configureNextAnimation('easeInEaseOut');
      setReminders((prev) => [...(prev || []), notification]);
    },
    [configureNextAnimation],
  );

  const handleReminderDeletion = useCallback(
    (reminderId: number) => {
      const filtered = reminders?.filter((reminder) => reminder.id !== reminderId) || [];
      Notification.cancelNofication(reminderId.toString());
      configureNextAnimation('easeInEaseOut');
      setReminders([...filtered]);
    },
    [configureNextAnimation, reminders],
  );

  const renderItemList = useCallback(
    ({item}) => {
      return <ReminderItem data={item} onDeletePress={() => handleReminderDeletion(item.id)} />;
    },
    [handleReminderDeletion],
  );

  return (
    <View style={styles.container}>
      <Header amountReminders={reminders?.length || 0} loading={loading} />
      <FlatList
        data={reminders}
        contentContainerStyle={styles.listContent}
        style={styles.list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItemList}
        ListEmptyComponent={renderListEmpty}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    borderTopColor: '#bbb',
    borderTopWidth: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  separator: {
    backgroundColor: '#ddd',
    width: '100%',
    height: StyleSheet.hairlineWidth,
  },
});
