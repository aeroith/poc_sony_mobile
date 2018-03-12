import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Animated } from 'react-native';
import NotificationItem from '../../containers/NotificationItem';
import styles from './styles';
import withTranslation from '../../hocs/Translation/index';

@withTranslation
export default class Notifications extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.animVal = new Animated.Value(0);
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x: this.animVal } } }]);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer} />
        <ScrollView
          onScroll={this.onScroll}
          scrollEventThrottle={10}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <NotificationItem style={styles.notificationItem} />
          <NotificationItem style={styles.notificationItem} />
          <NotificationItem style={styles.notificationItem} />
          <NotificationItem style={styles.notificationItem} />
          <NotificationItem style={styles.notificationItem} />
          <NotificationItem style={styles.notificationItem} />
          <NotificationItem style={styles.notificationItem} />
          <NotificationItem style={styles.notificationItem} />
          <NotificationItem style={styles.notificationItem} />
          <NotificationItem style={styles.notificationItem} />
          <NotificationItem style={styles.notificationItem} />
          <NotificationItem style={styles.notificationItem} />
          <NotificationItem style={styles.notificationItem} />
          <NotificationItem style={styles.notificationItem} />
          <NotificationItem style={styles.notificationItem} />
          <NotificationItem style={styles.notificationItem} />
          <NotificationItem style={styles.notificationItem} />
          <NotificationItem style={styles.notificationItem} />
          <NotificationItem style={styles.notificationItem} />
        </ScrollView>
      </View>
    );
  }
}
