import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHandler, StatusBar, View, Easing } from 'react-native';
import { NavigationActions, addNavigationHelpers } from 'react-navigation/src/react-navigation';
import { connect } from 'react-redux';
import Drawer from '../components/Drawer';
import AppNavigator from '../navigator';
import { addListener } from '../index';
import styles, { drawerCustomStyles } from './styles';
import NavBar from './NavBar';
import SideMenu from '../components/SideMenu';


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

  setDrawerRef = (el) => {
    this.el = el;
  };

  handleOpenDrawer = () => {
    if (this.el) this.el.openDrawer();
  };

  handleCloseDrawer = () => {
    if (this.el) this.el.closeDrawer();
  };

  renderDrawerContent = navigation => <SideMenu navigation={navigation} drawerActions={this.el} />;

  render() {
    const { dispatch, nav } = this.props;
    const navigation = addNavigationHelpers({ dispatch, state: nav, addListener });

    return (
      <View style={styles.wrapper}>
        <Drawer
          ref={this.setDrawerRef}
          style={styles.drawerContainer}
          drawerWidth={250}
          drawerContent={this.renderDrawerContent(navigation)}
          type={Drawer.types.Default}
          customStyles={drawerCustomStyles}
          maskAlpha={0.8}
          drawerPosition={Drawer.positions.Left}
          onDrawerOpen={() => { console.log('Drawer is opened'); }}
          onDrawerClose={() => { console.log('Drawer is closed'); }}
          easingFunc={Easing.ease}
        >
          <StatusBar barStyle="light-content" style={styles.statusBar} />
          <NavBar nav={nav} openDrawer={this.handleOpenDrawer} closeDrawer={this.handleCloseDrawer} />
          <View style={styles.app}>
            <AppNavigator navigation={navigation} />
          </View>
        </Drawer>
      </View>
    );
  }
}
