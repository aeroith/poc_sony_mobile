import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
// TODO For android react-native-linear-gradient should be put into build phase
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
import Utils from '../../utils/utils';

@withTranslation
@connect(
  state => ({
    isSearchBarVisible: state.search.isSearchBarVisible,
    isDrawerVisible: state.drawer.isDrawerVisible,
    channelName: state.app.channelName,
  }),
  {
    setSearchBarState: searchBarActions.setSearchBarState,
    setDrawerState: drawerActions.setDrawerState
  }
)
export default class NavBar extends Component {
    static propTypes = {
      translate: PropTypes.func.isRequired,
      setDrawerState: PropTypes.func.isRequired,
      setSearchBarState: PropTypes.func.isRequired,
      isDrawerVisible: PropTypes.bool.isRequired,
      channelName: PropTypes.string.isRequired,
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
        this.setState({ noFloat: !!route.noFloat });
      }
    }

    setRouteStack(route) {
      if (!route || (route.enum === (this.routeStack.current && this.routeStack.current.enum))) return;
      this.routeStack.prev = this.routeStack.current;
      this.routeStack.current = route;
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

    getGradientLocations = (isSearchBarVisible, noFloat) => {
      if (noFloat) return [1, 1];
      return [isSearchBarVisible ? 0.4 : 0.15, 1];
    };

    render() {
      const { isSearchBarVisible } = this.props;
      const { noFloat } = this.state;
      return (
        <Animatable.View style={[styles.navBarWrapper, noFloat && styles.navBarNoFloat]} animation="fadeInDown">
          <LinearGradient
            colors={[colorPalette.grayBg4, colorPalette.transparent]}
            locations={this.getGradientLocations(isSearchBarVisible, noFloat)}
          >
            <Search shouldRender={isSearchBarVisible} />
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
          </LinearGradient>
        </Animatable.View>

      );
    }
}
