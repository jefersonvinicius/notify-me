import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';

import Header from './src/components/Header';
import FloatButton from './src/components/FloatButton';
import COLORS from './src/assets/Colors';
import {EmptyListContainer, EmptyListMessage} from './src/components/AppStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ModalAddReminder from './src/components/ModalAddReminder';
import ReminderItem from './src/components/ReminderItem';

export interface INotification {
  id: number;
  description: string;
  date: number;
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
      cancelled: false,
      displayed: false,
    },
  ]);

  useEffect(() => {
    PushNotification.configure({
      onNotification: (notification) => {
        console.log(notification);
      },
      requestPermissions: false,
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
      id: Math.random(),
      description: data.description,
      date: data.date,
      cancelled: false,
      displayed: false,
    };
    setNotifications((prev: INotification[]) => [...prev, notification]);
  }, []);

  const renderItemList = useCallback(({item}) => {
    return <ReminderItem data={item} />;
  }, []);

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
