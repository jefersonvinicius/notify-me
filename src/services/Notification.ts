import PushNotification, {ChannelObject, Importance, ReceivedNotification} from 'react-native-push-notification';
import {INotification} from 'App';

const CHANNEL: ChannelObject = {
  channelId: 'reminders',
  channelName: 'Reminders',
  channelDescription: 'Receive reminders scheduled',
  importance: Importance.HIGH,
  vibrate: true,
};

class Notification {
  configure(onNotification: (notification: Omit<ReceivedNotification, 'userInfo'>) => void) {
    this.createChannelIfNotExists();
    PushNotification.configure({
      onNotification: onNotification,
      requestPermissions: false,
    });
  }

  notifySchedule(notification: INotification) {
    PushNotification.localNotificationSchedule({
      title: 'Lembrete',
      id: notification.id,
      message: notification.description,
      ongoing: notification.ongoing,
      date: new Date(notification.date),
      allowWhileIdle: true,
      importance: 'high',
      channelId: 'reminders',
    });
  }

  cancelNofication(notificationId: string) {
    PushNotification.cancelLocalNotification(notificationId);
  }

  private createChannelIfNotExists() {
    PushNotification.channelExists(CHANNEL.channelId, (exists) => {
      if (exists) return;
      PushNotification.createChannel(CHANNEL, (_) => console.log('Channel created!'));
    });
  }
}

export default new Notification();
