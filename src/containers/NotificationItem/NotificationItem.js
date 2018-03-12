import React, { Component } from 'react';
import { View } from 'react-native';
import NotificationItem from '../../components/NotificationItem';
import styles from './styles';

class NotificationItemContainer extends Component {
  render() {
    return (
      <View {...this.props}>
        <NotificationItem style={styles.container} {...this.props} />
      </View>
    );
  }
}

export default NotificationItemContainer;
