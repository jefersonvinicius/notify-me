import AsyncStorage from '@react-native-community/async-storage';
import {INotification} from 'App';

export async function storeReminders(reminders: INotification[]) {
  await AsyncStorage.setItem('reminders', JSON.stringify(reminders));
}

export async function getReminders(): Promise<INotification[]> {
  const reminders = await AsyncStorage.getItem('reminders');
  return reminders === null ? [] : JSON.parse(reminders);
}
