import { Platform, PushNotificationIOS } from 'react-native';
import PushNotification from '../utils/push-notification';
import { store } from '../index';

const moment = require('moment');

const actionTypes = {
  SET_NOTIFICATION: 'SET_NOTIFICATION',
  SET_NOTIFICATION_SCHEDULED: 'SET_NOTIFICATION_SCHEDULED',
  UNSET_NOTIFICATION: 'UNSET_NOTIFICATION',
  CLEAR_NOTIFICATION: 'CLEAR_NOTIFICATION',
};

const initialState = {
  notifications: [],
};


/**
 * @typedef {Object} notificationProperty
 * @property {number} id
 * @property {String} message
 * @property {Date} date
 */

/**
 * To make it work make sure to put a notificationProperty object
 * inside the notification argument.
 */
const actions = {
  setNotification: notification =>
    ({ type: actionTypes.SET_NOTIFICATION, notification }),
  setNotificationScheduled: notification =>
    ({ type: actionTypes.SET_NOTIFICATION_SCHEDULED, notification }),
  unsetNotification: id =>
    ({ type: actionTypes.UNSET_NOTIFICATION, id }),
  clearNotification: () =>
    ({ type: actionTypes.CLEAR_NOTIFICATION }),
  onNotification: (notification) => {
    if (Platform.OS === 'ios') {
      notification.finish(PushNotificationIOS.FetchResult.NoData);
      return store.dispatch({ type: actionTypes.UNSET_NOTIFICATION, id: notification.data.id });
    }
    return store.dispatch({ type: actionTypes.UNSET_NOTIFICATION, id: +notification.id });
  }
};

const pushNotification = new PushNotification(actions.onNotification).init();

const setLocalNotification = (id, message, date) => {
  if (!date) {
    if (Platform.OS === 'ios') {
      return pushNotification.localNotification({
        userInfo: {
          id
        },
        message,
      });
    }
    return pushNotification.localNotification({
      id: id.toString(),
      message,
    });
  }
  if (Platform.OS === 'ios') {
    return pushNotification.localNotificationSchedule({
      userInfo: {
        id,
      },
      message,
      date,
    });
  }
  return pushNotification.localNotificationSchedule({
    id: id.toString(),
    message,
    date,
  });
};

const actionsMap = {
  [actionTypes.SET_NOTIFICATION]: (state, action) => {
    if (!action.notificationProperties) throw new Error('Notification properties are missing!');
    const { notificationProperties: { message, id }, ...notification } = action;
    setLocalNotification(id, message);
    return {
      ...state,
      notifications: [...state.notifications, notification],
    };
  },
  [actionTypes.SET_NOTIFICATION_SCHEDULED]: (state, action) => {
    if (!action.notification.notificationProperties) throw new Error('Notification properties are missing!');
    const { notificationProperties: { message, id, date }, ...notification } = action.notification;
    setLocalNotification(id, message, date);
    return {
      ...state,
      notifications: [...state.notifications, { ...notification, date }],
    };
  },
  [actionTypes.UNSET_NOTIFICATION]: (state, action) => {
    const id = Platform.OS === 'ios' ? action.id : action.id.toString();
    pushNotification.cancelLocalNotifications({ id });
    return {
      ...state,
      notifications: state.notifications.filter(x => x.id !== action.id),
    };
  },
  [actionTypes.CLEAR_NOTIFICATION]: state => ({
    ...state,
    notifications: state.notifications.filter(x => x.date - 600 > moment().unix()),
  })
};

export { initialState, actions };
export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
