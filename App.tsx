import React, {useEffect} from 'react';
import {View, StyleSheet, Button} from 'react-native';

import PushNotification from 'react-native-push-notification';

export default function App() {
  useEffect(() => {
    PushNotification.configure({
      onNotification: (notification) => {
        console.log(notification);
      },
      requestPermissions: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Notify me"
        onPress={() => {
          PushNotification.localNotificationSchedule({
            message: 'Teste',
            date: new Date(Date.now() + 5000),
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
