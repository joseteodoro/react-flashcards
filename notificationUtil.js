import moment from 'moment'
import { Notifications } from 'expo'
import {saveConfiguration} from './storeUtils'

export default function updateLocaNotifications (configs) {
  const {notifications, notificationTime} = configs
  Notifications.cancelAllScheduledNotificationsAsync()
  if (notifications) {
    let notificationMoment = moment(notificationTime)
    const now = moment()
    while (notificationMoment.isBefore(now)) {
      notificationMoment.add(1, 'days')
    }
    const schedulingOptions = {
      time: notificationMoment.valueOf(),
      repeat: 'day'
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
    const updatedTime = new Date(notificationMoment.valueOf())
    Object.assign(configs, updatedTime)
    saveConfiguration(configs, () => {
      Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
    })
  }
}
