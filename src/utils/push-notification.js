import pn from 'react-native-push-notification';

const noop = () => {};
export default class PushNotification {
  constructor(onNotification, onRegister = noop, options = {}) {
    const defaultOptions = {
      senderID: '453176763600',
    };
    const mergedOptions = { ...defaultOptions, ...options };
    this.pushNotification = pn;
    this.pushNotification.configure({
      onNotification,
      onRegister,
      ...mergedOptions
    });
  }
  init() {
    return this.pushNotification;
  }
}

