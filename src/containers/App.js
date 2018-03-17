import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHandler, StatusBar, View, AppState } from 'react-native';
import { NavigationActions, addNavigationHelpers } from 'react-navigation/src/react-navigation';
import OneSignal from 'react-native-onesignal';
import { connect } from 'react-redux';
import AppNavigator from '../navigator';
import { addListener } from '../index';
import { actions as appActions } from '../reducers/app';
import { actions as notificationActions } from '../reducers/notification';
import styles from './styles';
import NavBar from './NavBar';
import Menu from './Menu';

@connect(
  state => ({
    nav: state.nav,
    locale: state.app.locale,
    configLoading: state.app.configLoading,
  }),
  dispatch => ({
    dispatch,
    getConfig: country => dispatch(appActions.getConfig(country)),
    clearNotification: () => dispatch(notificationActions.clearNotification()),
  }),
)
export default class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    getConfig: PropTypes.func.isRequired,
    clearNotification: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState
    };
  }

  componentWillMount() {
    this.props.getConfig();
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
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.locale && (nextProps.locale !== this.props.locale)) {
      this.props.getConfig();
    }
  }

  componentWillUnmount() {
    this.backHandler.remove();
    AppState.removeEventListener('change', this.handleAppStateChange);
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

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.props.clearNotification();
    }
    this.setState({ appState: nextAppState });
  };

  render() {
    const { dispatch, nav } = this.props;
    const navigation = addNavigationHelpers({ dispatch, state: nav, addListener });

    return (
      <View style={styles.wrapper}>
        <Menu navigation={navigation}>
          <StatusBar barStyle="light-content" style={styles.statusBar} />
          <NavBar nav={nav} navigation={navigation} />
          <View style={styles.app}>
            <AppNavigator navigation={navigation} />
          </View>
        </Menu>
      </View>
    );
  }
}
