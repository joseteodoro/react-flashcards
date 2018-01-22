import * as moment from 'moment'
import { Notifications } from 'expo'

export default function updateLocaNotifications ({notifications, notificationHour, notificationMinute}) {
  Notifications.cancelAllScheduledNotificationsAsync()
  if (notifications) {
    const now = moment()
    const day = now.date()
    const month = now.month()
    const year = now.year()
    const date = moment(`${year}/${month}/${day} ${notificationHour}:${notificationMinute}:00`)
    date.add(1, 'minutes')
    const schedulingOptions = {
      time: date.valueOf()
    }
    const localNotification = {
      title: 'Flash Cards',
      body: 'Time to study with your flashcards :D',
      android: {
        priority: 'high',
        sticky: false,
        vibrate: true
      }
    }
    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
  }
}
