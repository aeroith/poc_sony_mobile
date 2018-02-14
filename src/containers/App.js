import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHandler, StatusBar, View } from 'react-native';
import { NavigationActions, addNavigationHelpers } from 'react-navigation/src/react-navigation';
import { connect } from 'react-redux';
import AppNavigator from '../navigator';
import { addListener } from '../index';
import styles from './styles';
import NavBar from '../components/NavBar';

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

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.dispatch(NavigationActions.back());
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

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
