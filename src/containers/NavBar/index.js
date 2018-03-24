import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import colorPalette from '../../config/colorPalette';
import withTranslation from '../../hocs/Translation/index';
import styles from './styles';
import Search from '../Search/index';
import { actions as searchBarActions } from '../../reducers/search';
import { actions as drawerActions } from '../../reducers/drawer';
import { actions as programActions } from '../../reducers/program';
import { push } from '../../reducers/nav';
import Utils from '../../utils/utils';

@withTranslation
@connect(
  state => ({
    isSearchBarVisible: state.search.isSearchBarVisible,
    isDrawerVisible: state.drawer.isDrawerVisible,
    channelName: state.app.channelName,
    programDetails: state.program.details,
    isProgramHeaderTransparent: state.program.isHeaderTransparent,
  }),
  {
    setSearchBarState: searchBarActions.setSearchBarState,
    setDrawerState: drawerActions.setDrawerState,
    resetProgram: programActions.resetProgram,
  }
)
export default class NavBar extends Component {
    static propTypes = {
      translate: PropTypes.func.isRequired,
      setDrawerState: PropTypes.func.isRequired,
      setSearchBarState: PropTypes.func.isRequired,
      resetProgram: PropTypes.func.isRequired,
      isDrawerVisible: PropTypes.bool.isRequired,
      channelName: PropTypes.string.isRequired,
      isProgramHeaderTransparent: PropTypes.bool.isRequired
    };

    constructor(props) {
      super(props);
      this.routeStack = {
        prev: null,
        current: null,
      };
      this.state = {
        noFloat: false,
      };
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.nav) {
        const route = this.getCurrentRouteDetails(nextProps.nav);
        this.setRouteStack(route);
        const noFloat = route.noFloat;
        this.setState({ noFloat });
      }
    }

    setRouteStack(route) {
      if (!route || (route.enum === (this.routeStack.current && this.routeStack.current.enum))) return;
      this.routeStack.prev = this.routeStack.current;
      this.routeStack.current = route;
      if (this.routeStack.prev && this.routeStack.prev.enum === 'program') {
        this.props.resetProgram();
      }
    }

    getCurrentRouteDetails = (navProps) => {
      if (!navProps) return;
      return Utils.getCurrentRoute(navProps);
    };

    getNavHeader = (route, callback) => {
      const currentRoute = route || this.getCurrentRouteDetails(this.props.nav);
      const channelEnum = Utils.getChannelEnum(this.props.channelName);
      if (currentRoute.uniqueMenuItem) return this.props.translate(currentRoute.enum);
      const navHeader = this.props.translate(this.props.channelName
        ? `menu.${channelEnum}.${currentRoute.enum}`
        : '');
      if (callback) callback(navHeader);
      return navHeader;
    };

    handleMenuButtonClick = () => {
      const { isDrawerVisible } = this.props;
      this.props.setDrawerState(!isDrawerVisible);
    };

    handleSearchButtonClick = () => {
      const { isSearchBarVisible } = this.props;
      this.props.setSearchBarState(!isSearchBarVisible);
    };

    handleBackClick = () => {
      const { routes } = this.props.navigation.state;
      this.props.navigation.dispatch(push(routes[0].routeName, 'Program'));
    };

    getGradientLocations = (isSearchBarVisible, noFloat) => {
      if (noFloat) return [1, 1];
      if (this.routeStack.current && this.routeStack.current.enum === 'program') return [0, 0];
      return [isSearchBarVisible ? 0.6 : 0.15, 1];
    };

    renderNavBar = () => {
      if (this.routeStack.current && this.routeStack.current.enum === 'program') {
        return (
          <View style={styles.programWrapper}>
            <TouchableOpacity
              hitSlop={{
                top: 10, right: 20, bottom: 20, left: 15
              }}
              onPress={this.handleBackClick}
              style={styles.navBarButton}
              activeOpacity={0.8}
            >
              <Icon name="arrow-left" size={19} color={colorPalette.white} />
            </TouchableOpacity>
          </View>
        );
      }
      const { isSearchBarVisible, navigation } = this.props;
      const { noFloat } = this.state;
      return (
        <View>
          <Search shouldRender={isSearchBarVisible} navigation={navigation} />
          <View style={[styles.linearGradientWrapper, noFloat && styles.linearGradientWrapperNoFloat, isSearchBarVisible && styles.linearGradientWrapper__searchBarOpen]}>
            <TouchableOpacity
              hitSlop={{
                top: 10, right: 20, bottom: 20, left: 15
              }}
              onPress={this.handleMenuButtonClick}
              style={styles.navBarButton}
              activeOpacity={0.8}
            >
              <Icon name="menu" size={19} color={colorPalette.white} />
            </TouchableOpacity>
            <Text style={styles.navBarHeaderText}>{this.getNavHeader()}</Text>
            <TouchableOpacity
              hitSlop={{
                           top: 10, right: 15, bottom: 20, left: 20
                       }}
              onPress={this.handleSearchButtonClick}
              style={styles.navBarButton}
              activeOpacity={0.8}
            >
              <Icon name="magnifier" size={19} color={colorPalette.white} />
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    render() {
      const { isSearchBarVisible } = this.props;
      const { noFloat } = this.state;
      return (
        <Animatable.View style={[styles.navBarWrapper, noFloat && styles.navBarNoFloat]} animation="fadeInDown">
          <LinearGradient
            colors={[colorPalette.grayBg4, colorPalette.transparent]}
            locations={this.getGradientLocations(isSearchBarVisible, noFloat)}
            style={styles.linearGradientComponent}
          >
            {this.renderNavBar()}
          </LinearGradient>
        </Animatable.View>

      );
    }
}
