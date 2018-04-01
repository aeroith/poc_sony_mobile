import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import _find from 'lodash/find';
import _isObject from 'lodash/isObject';
import styles from './styles';
import MenuItem from './MenuItem';
import withTranslation from '../../hocs/Translation';
import Utils from '../../utils/utils';
import routeMappings from '../../config/routeMappings';
import { push } from '../../reducers/nav';
import colorPalette from '../../config/colorPalette';
import {actions as notificationActions} from "../../reducers/notification";
import {actions as appActions} from "../../reducers/app";

@withTranslation
@connect(
    state => ({
    channelName: state.app.channelName,
    connectedChannels: state.app.connectedChannels,
    channelLogo: state.app.channelLogo,
    language: state.app.language,
    country: state.app.country,
    menu: state.app.menu,
    programDetails: state.program.details,
    programTmdbDetails: state.program.tmdbDetails,
    isLoggedIn: state.user.isLoggedIn,
  }),
  dispatch => ({
    setLoginScreenVisibility: isVisible => dispatch(appActions.setLoginScreenVisibility(isVisible)),
  }),
)
export default class MenuContent extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    setDrawerState: PropTypes.func.isRequired,
    isDrawerVisible: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool,
    channelName: PropTypes.string.isRequired,
    connectedChannels: PropTypes.arrayOf(PropTypes.object),
    channelLogo: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    menu: PropTypes.arrayOf(PropTypes.string),
    translate: PropTypes.func.isRequired,
    programDetails: PropTypes.any,
    programTmdbDetails: PropTypes.any,
    isLoggedIn: PropTypes.bool.isRequired,
    setLoginScreenVisibility: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isLoading: false,
    connectedChannels: [],
    menu: [],
    programDetails: null,
    programTmdbDetails: null,
  };

  static navigations = [
    { text: 'other_channels', iconText: 'ios-globe-outline', },
    { text: 'settings', iconText: 'ios-settings-outline', },
    { text: 'notifications', iconText: 'ios-notifications-outline', },
  ];

  constructor(props) {
    super(props);
    this.elReferences = [];
  }

  componentWillReceiveProps(nextProps) {
    const routeNames = {
      prevRoute: '',
      nextRoute: '',
    };
    Object.keys(routeNames).forEach((key) => {
      const propsToSend = key === 'prevRoute' ? this.props : nextProps;
      routeNames[key] = this.getRouteName(propsToSend);
    });
    if ((routeNames.prevRoute !== routeNames.nextRoute)
        || (nextProps.isDrawerVisible !== this.props.isDrawerVisible)) {
      this.closeMenuItemChildrenAll();
    }
  }

  setMenuItemRef = (el) => {
    if (el && el.props.children) {
      this.elReferences.push(el);
    }
  };

  getRouteName = (props) => {
    if (!props || !props.navigation) return '';
    const { routes } = props.navigation.state;
    return routes[routes.length - 1].routeName;
  };

  closeMenuItemChildrenAll = () => {
    if (this.elReferences && this.elReferences.length > 0) {
      this.elReferences.forEach(el => el.closeMenuItemChildren());
    }
  };

  handleMenuItemClick = (item, currentRouteName) => {
    const { routeName } = _find(routeMappings, { enum: _isObject(item) ? item.text : item });
    if (currentRouteName !== routeName) {
      this.props.navigation.dispatch(push(routeName, currentRouteName));
    }
  };

  handleBroadcastMenuItemOpened = (menuItemName) => {
    const processMenuItemName = name => name.toLowerCase().replace(/\s/, '_');
    const menuItemNameProcessed = processMenuItemName(menuItemName);
    this.elReferences.forEach((el) => {
      if (processMenuItemName(el.props.text.content) !== menuItemNameProcessed) {
        el.closeMenuItemChildren();
      }
    });
  };

  renderSubMenuItems = (navigationItemText) => {
    const { connectedChannels, channelName } = this.props;
    const sisterChannels = connectedChannels
      ? connectedChannels.filter(channel => channel.name !== channelName)
      : [];
    if (navigationItemText !== 'other_channels' || sisterChannels.length === 0) return null;
    return (
      <View>
        {sisterChannels.map((sisterChannel, indexSisterChannel) => (<MenuItem
          bordered
          childItem
          isLastItem={indexSisterChannel === sisterChannels.length - 1}
          key={`${sisterChannel.name}_${indexSisterChannel}`}
          image={{
            uri: sisterChannel.logo,
            height: 40,
            width: 30,
          }}
          style={styles.menuItemChildren}
          text={{ content: sisterChannel.name, style: styles.channelInfoText }}
        />))}
      </View>
    );
  };

  render() {
    const {
      channelLogo, channelName, menu, translate, programDetails, programTmdbDetails, isLoggedIn, setLoginScreenVisibility
    } = this.props;
    const route = Utils.getCurrentRoute(this.props.navigation.state);
    const channelEnum = Utils.getChannelEnum(channelName);
    return (
      <View style={styles.menuContentWrapper}>
        {/* Channel name */}
        <MenuItem
          bordered
          image={{
              uri: channelLogo,
              height: 40,
              width: 30
          }}
          text={{ content: channelName, style: styles.channelInfoText }}
        />
        {/* Login button */}
        {!isLoggedIn && <MenuItem
          bordered
          text={{ content: translate('Login') }}
          contentRight={<Icon name="ios-arrow-dropright" size={25} color={colorPalette.white} />}
          onPress={() => setLoginScreenVisibility(true)}
        />}
        {/* Program detail */}
        {programDetails && programTmdbDetails && (
          <MenuItem
            isSelected
            bordered
            image={{
              uri: programTmdbDetails.full_poster_path,
              height: 40,
              width: 30
            }}
            text={{ content: programDetails.name, style: styles.channelInfoText }}
          />
        )}
        <ScrollView>
          {/* Main menu*/}
          {menu.length > 0 && menu.map((item, index) => (
            <MenuItem
              bordered
              isSelected={route.enum === item}
              text={{ content: translate(`menu.${channelEnum}.${item}`) }}
              key={`${item}_${index}`}
              onPress={() => this.handleMenuItemClick(item, route.routeName)}
            />
            ))}
          {/* Navigations */}
          {MenuContent.navigations.map((navigationItem, index) => (
            <MenuItem
              ref={el => this.setMenuItemRef(el)}
              bordered
              isSelected={route.enum === navigationItem.text}
              key={`${navigationItem.text}_${index}`}
              text={{ content: translate(navigationItem.text) }}
              broadcastMenuItemOpened={this.handleBroadcastMenuItemOpened}
              contentRight={<Icon name={navigationItem.iconText} size={25} color={colorPalette.white} />}
              onPress={() => this.handleMenuItemClick(navigationItem, route.routeName)}
            >
              {this.renderSubMenuItems(navigationItem.text)}
            </MenuItem>
            ))}
        </ScrollView>

      </View>
    );
  }
}
