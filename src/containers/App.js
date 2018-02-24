import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHandler, StatusBar, View } from 'react-native';
import { NavigationActions, addNavigationHelpers } from 'react-navigation/src/react-navigation';
import { connect } from 'react-redux';
import AppNavigator from '../navigator';
import { addListener } from '../index';
import { actions as appActions } from '../reducers/app';
import styles from './styles';
import NavBar from './NavBar';
import Menu from './Menu';

@connect(
  state => ({
    nav: state.nav,
    country: state.app.country,
    language: state.app.language,
    configLoading: state.app.configLoading,
  }),
  dispatch => ({
    dispatch,
    getConfig: country => dispatch(appActions.getConfig(country)),
  }),
)
export default class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { country } = this.props;
    if (country) this.props.getConfig(country);
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.dispatch(NavigationActions.back());
      return true;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.country && (nextProps.country !== this.props.country)) {
      this.props.getConfig(nextProps.country);
    }
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    const { dispatch, nav } = this.props;
    const navigation = addNavigationHelpers({ dispatch, state: nav, addListener });

    return (
      <View style={styles.wrapper}>
        <Menu navigation={navigation}>
          <StatusBar barStyle="light-content" style={styles.statusBar} />
          <NavBar nav={nav} />
          <View style={styles.app}>
            <AppNavigator navigation={navigation} />
          </View>
        </Menu>
      </View>
    );
  }
}
