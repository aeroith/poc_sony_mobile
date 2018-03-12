import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import _find from 'lodash/find';
import styles from './styles';
import MenuItem from './MenuItem';
import withTranslation from '../../hocs/Translation';
import Utils from '../../utils/utils';
import routeMappings from '../../config/routeMappings';
import { resetAction } from '../../reducers/nav';
import colorPalette from '../../config/colorPalette';

@withTranslation
@connect(state => ({
  channelName: state.app.channelName,
  connectedChannels: state.app.connectedChannels,
  channelLogo: state.app.channelLogo,
  language: state.app.language,
  country: state.app.country,
  menu: state.app.menu,
}))
export default class MenuContent extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    setDrawerState: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    channelName: PropTypes.string.isRequired,
    connectedChannels: PropTypes.arrayOf(PropTypes.object),
    channelLogo: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    menu: PropTypes.arrayOf(PropTypes.string),
    translate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isLoading: false,
    connectedChannels: [],
    menu: [],
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

  componentWillReceiveProps(nextProps, prevProps) {
    const routeNames = {
      prevRoute: '',
      nextRoute: '',
    };
    Object.keys(routeNames).forEach((key) => {
      const propsToSend = key === 'prevRoute' ? prevProps : nextProps;
      routeNames[key] = this.getRouteName(propsToSend);
    });
    if (routeNames.prevRoute !== routeNames.nextRoute && this.elReferences.length > 0) {
      this.elReferences.forEach(el => el.closeMenuItemChildren());
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

  handleMenuItemClick = (item, currentRouteName) => {
    const { routeName } = _find(routeMappings, { enum: item });
    if (currentRouteName !== routeName) {
      this.props.navigation.dispatch(resetAction(routeName, currentRouteName));
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
      channelLogo, channelName, menu, translate
    } = this.props;
    const route = Utils.getCurrentRoute(this.props.navigation.state);
    const channelEnum = Utils.getChannelEnum(channelName);
    return (
      <View style={styles.menuContentWrapper}>
        <MenuItem
          bordered
          image={{
              uri: channelLogo,
              height: 40,
              width: 30
          }}
          text={{ content: channelName, style: styles.channelInfoText }}
        />
        <ScrollView>
          {/* Main menu*/}
          {menu.length > 0 && menu.map((item, index) => (
            <MenuItem
              bordered
              style={[route.enum === item && styles.selectedMenuItem]}
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
              key={`${navigationItem.text}_${index}`}
              text={{ content: translate(navigationItem.text) }}
              broadcastMenuItemOpened={this.handleBroadcastMenuItemOpened}
              contentRight={<Icon name={navigationItem.iconText} size={25} color={colorPalette.white} />}
            >
              {this.renderSubMenuItems(navigationItem.text)}
            </MenuItem>
            ))}
        </ScrollView>

      </View>
    );
  }
}
