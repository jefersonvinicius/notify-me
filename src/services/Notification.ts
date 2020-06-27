import PushNotification from 'react-native-push-notification';
import {INotification} from 'App';

class Notification {
  configure(onNotification: (notification: typeof PushNotification) => void) {
    PushNotification.configure({
      onNotification: onNotification,
      requestPermissions: false,
    });
  }

  notifySchedule(notification: INotification) {
    PushNotification.localNotificationSchedule({
      title: 'Lembrete',
      id: notification.id.toString(),
      message: notification.description,
      ongoing: notification.ongoing,
      date: new Date(notification.date),
    });
  }

  cancelNofication(notificationId: string) {
    PushNotification.cancelLocalNotifications({id: notificationId});
  }
}

export default new Notification();
