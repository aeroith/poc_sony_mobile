import React, { Component } from 'react';
import { View, PushNotificationIOS, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import Carousel from '../Carousel';
import styles from './styles';
import TabbedDatePicker from '../TabbedDatePicker';
import Guide from '../Guide';
import withTranslation from '../../hocs/Translation';
import withPushNotification from '../../hocs/WithPushNotification';

// called when user presses on the notification
const onNotification = (notification) => {
  console.log('NOTIFICATION:', notification);

  // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
  notification.finish(PushNotificationIOS.FetchResult.NoData);
};

@withPushNotification(onNotification)
@withTranslation
export default class TVGuide extends Component {
  static propTypes = {
    pushNotification: PropTypes.object.isRequired,
  };

  sendNotification = () => {
    this.props.pushNotification.localNotification({
      message: 'You pushed the notification button!'
    });
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
