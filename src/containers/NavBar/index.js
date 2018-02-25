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

    getNavHeader = () => {
      const route = Utils.getCurrentRoute(this.props.nav);
      return this.props.translate(this.props.channelName
        ? `menu.${this.props.channelName}.${route.enum}`
        : '');
    };

    handleMenuButtonClick = () => {
      const { isDrawerVisible } = this.props;
      this.props.setDrawerState(!isDrawerVisible);
    };

    handleSearchButtonClick = () => {
      const { isSearchBarVisible } = this.props;
      this.props.setSearchBarState(!isSearchBarVisible);
    };

    render() {
      const { isSearchBarVisible } = this.props;
      return (
        <Animatable.View style={styles.navBarWrapper} animation="fadeInDown">
          <LinearGradient
            colors={[colorPalette.grayBg4, colorPalette.transparent]}
            locations={[isSearchBarVisible ? 0.4 : 0.15, 1]}
          >
            <Search shouldRender={isSearchBarVisible} />
            <View style={[styles.linearGradientWrapper, isSearchBarVisible && styles.linearGradientWrapper__searchBarOpen]}>
              <TouchableOpacity
                hitSlop={{ top: 10, right: 20, bottom: 20, left: 15 }}
                onPress={this.handleMenuButtonClick}
                style={styles.navBarButton}
                activeOpacity={0.8}
              >
                <Icon name="menu" size={19} color={colorPalette.white} />
              </TouchableOpacity>
              <Text style={styles.navBarHeaderText}>{this.getNavHeader()}</Text>
              <TouchableOpacity
                hitSlop={{ top: 10, right: 15, bottom: 20, left: 20 }}
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
