import React, { Component } from 'react';
import { View, PushNotificationIOS, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import Carousel from '../../containers/Carousel/index';
import styles from './styles';
import TabbedDatePicker from '../../containers/TabbedDatePicker/index';
import Guide from '../../containers/Guide/index';
import withTranslation from '../../hocs/Translation/index';
import PushNotification from '../../utils/push-notification';

// called when user presses on the notification
const onNotification = (notification) => {
  console.log('NOTIFICATION:', notification);
  console.log(notification.data)
  // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
  notification.finish(PushNotificationIOS.FetchResult.NoData);
};

@withTranslation
export default class TVGuide extends Component {
  constructor(props) {
    super(props);
    this.pushNotification = new PushNotification(onNotification).init();
  }

  sendNotification = () => {
    this.pushNotification.localNotificationSchedule({
      message: 'You pushed the notification button!',
      userInfo: {
        id: 1,
      },
      date: new Date(Date.now() + (5 * 1000))
    });
    this.pushNotification.cancelLocalNotifications({id: 2})
  };

  render() {
    return (
      <View style={styles.container}>
        <Carousel />
        <TabbedDatePicker />
        <Guide />
        <TouchableOpacity
          onPress={this.sendNotification}
          style={{
            width: '100%',
            flex: 1.2,
            backgroundColor: '#333',
            justifyContent: 'center',
            alignItems: 'center'
        }}
        >
          <Text style={{
            color: 'white',
          }}
          >
            Send Notification!
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
