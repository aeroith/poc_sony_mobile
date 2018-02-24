import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';

const noop = () => {};

const withPushNotification = (onNotification, onRegister = noop, options = {}) => RawComponent => class PushController extends Component {
  constructor(props) {
    super(props);
    const defaultOptions = {
      senderID: '453176763600',
    };
    this.mergedOptions = { ...defaultOptions, ...options };
    this.pushNotification = PushNotification;
  }

  componentDidMount() {
    this.pushNotification.configure({
      onNotification,
      onRegister,
      ...this.mergedOptions
    });
  }

  render() {
    return (
      <RawComponent pushNotification={this.pushNotification} {...this.props} />
    );
  }
};

export default withPushNotification;
