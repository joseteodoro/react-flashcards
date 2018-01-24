import moment from 'moment'
import { Notifications } from 'expo'
import {loadConfiguration, saveConfiguration} from './storeUtils'

export default function updateLocaNotifications ({notifications, notificationTime}) {
  Notifications.cancelAllScheduledNotificationsAsync()
  if (notifications) {
    let notificationMoment = moment(notificationTime)
    const now = moment()
    if (notificationMoment.isBefore(now)) {
      notificationMoment.add(1, 'days')
    }
    const schedulingOptions = {
      time: notificationMoment.valueOf()
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
    loadConfiguration((loadedConfig) => {
      const notificationTime = new Date(notificationMoment.valueOf())
      const updatedConfig = {...loadedConfig, notificationTime}
      saveConfiguration(updatedConfig, () => {
        Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
      })
    })
  }
}
