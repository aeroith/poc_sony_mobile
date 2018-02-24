import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHandler, StatusBar, View } from 'react-native';
import { NavigationActions, addNavigationHelpers } from 'react-navigation/src/react-navigation';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import { connect } from 'react-redux';
import AppNavigator from '../navigator';
import { addListener } from '../index';
import styles from './styles';
import NavBar from './NavBar';

@connect(
  state => ({
    nav: state.nav,
  }),
  dispatch => ({ dispatch }),
)
export default class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };

  componentWillMount() {
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.dispatch(NavigationActions.back());
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('registered', this.onRegistered);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = (notification) => {
    console.log('Notification received: ', notification);
  };

  onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  };

  onRegistered = (notifData) => {
    console.log('Device had been registered for push notifications!', notifData);
  };

  onIds = (device) => {
    console.log('Device info: ', device);
  };

  render() {
    const { dispatch, nav } = this.props;
    return (
      <View style={styles.wrapper}>
        <StatusBar barStyle="light-content" />
        <NavBar nav={nav} />
        <View style={styles.app}>
          <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav, addListener })} />
        </View>
      </View>
    );
  }
}
