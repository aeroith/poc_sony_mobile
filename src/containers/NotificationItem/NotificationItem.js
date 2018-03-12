import React, { Component } from 'react';
import { View } from 'react-native';
import NotificationItem from '../../components/NotificationItem';
import styles from './styles';

class NotificationItemContainer extends Component {
  render() {
    return (
      <NotificationItem {...this.props} />
    );
  }
}

export default NotificationItemContainer;
