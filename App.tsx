import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import PushNotification from 'react-native-push-notification';

import Header from './src/components/Header';
import FloatButton from './src/components/FloatButton';
import COLORS from './src/assets/Colors';
import {EmptyListContainer, EmptyListMessage} from './src/components/AppStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ModalAddReminder from './src/components/ModalAddReminder';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

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

  return (
    <View style={styles.container}>
      <Header amountReminders={notifications.length} />
      <FlatList data={notifications} contentContainerStyle={styles.list} ListEmptyComponent={renderListEmpty} />
      <ModalAddReminder
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
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
  },
  list: {
    flexGrow: 1,
  },
});
