import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHandler, StatusBar, View } from 'react-native';
import { NavigationActions, addNavigationHelpers } from 'react-navigation/src/react-navigation';
import { connect } from 'react-redux';
import Drawer from '../components/Drawer';
import AppNavigator from '../navigator';
import { addListener } from '../index';
import styles, { drawerCustomStyles } from './styles';
import drawerConfig from '../components/Drawer/config';
import NavBar from './NavBar';
import SideMenu from '../components/SideMenu';
import { actions as drawerActions } from '../reducers/drawer';

@connect(
  state => ({
    nav: state.nav,
    isDrawerVisible: state.drawer.isDrawerVisible,
  }),
  dispatch => ({
    dispatch,
    setDrawerState: drawerState => dispatch(drawerActions.setDrawerState(drawerState))
  }),
)
export default class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
    isDrawerVisible: PropTypes.bool.isRequired,
    setDrawerState: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.dispatch(NavigationActions.back());
      return true;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isDrawerVisible !== nextProps.isDrawerVisible) {
      const drawerRefMethod = nextProps.isDrawerVisible ? 'openDrawer' : 'closeDrawer';
      if (this.el) this.el[drawerRefMethod]();
    }
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  setDrawerRef = (el) => {
    this.el = el;
  };

  handleDrawerToggle(drawerState) {
    return () => {
      if (this.props.isDrawerVisible !== drawerState) {
        this.props.setDrawerState(drawerState);
      }
    };
  }

  renderDrawerContent = navigation => <SideMenu navigation={navigation} setDrawerState={this.props.setDrawerState} />;

  render() {
    const { dispatch, nav } = this.props;
    const navigation = addNavigationHelpers({ dispatch, state: nav, addListener });

    return (
      <View style={styles.wrapper}>
        <Drawer
          {...drawerConfig}
          ref={this.setDrawerRef}
          style={styles.drawerContainer}
          drawerContent={this.renderDrawerContent(navigation)}
          customStyles={drawerCustomStyles}
          onDrawerOpen={this.handleDrawerToggle(true)}
          onDrawerClose={this.handleDrawerToggle(false)}
        >
          <StatusBar barStyle="light-content" style={styles.statusBar} />
          <NavBar nav={nav} />
          <View style={styles.app}>
            <AppNavigator navigation={navigation} />
          </View>
        </Drawer>
      </View>
    );
  }
}
