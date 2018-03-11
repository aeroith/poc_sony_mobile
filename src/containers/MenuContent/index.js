import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import _find from 'lodash/find';
import Image from '../../components/Image';
import styles from './styles';
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

  handleMenuItemClick = (item, currentRouteName) => {
    const { routeName } = _find(routeMappings, { enum: item });
    if (currentRouteName !== routeName) {
      this.props.navigation.dispatch(resetAction(routeName, currentRouteName));
    }
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
              bordered
              key={`${navigationItem.text}_${index}`}
              text={{ content: translate(navigationItem.text) }}
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

class MenuItem extends Component {
  static propTypes = {
    style: PropTypes.any,
    image: PropTypes.objectOf(PropTypes.any),
    text: PropTypes.objectOf(PropTypes.any).isRequired,
    bordered: PropTypes.bool,
    isLastItem: PropTypes.bool,
    childItem: PropTypes.bool,
  };

  static defaultProps = {
    image: {},
    style: {},
    bordered: false,
    isLastItem: false,
    childItem: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      menuItemChildrenHeight: new Animated.Value(0),
      menuItemChildrenOpacity: new Animated.Value(0),
    };

    this.height = {
      opened: { toValue: 100 }, // Default value set to 100
      closed: { toValue: 0 },
    };

    this.animationEasing = { duration: 200, easing: Easing.linear };
    this.animation = {};
    this.noop = () => {};
  }

  toggleMenuItemChildren = () => {
    this.setState({ isOpen: !this.state.isOpen });
    if (this.state.isOpen) {
      this.animation.open.stop();
      this.animation.close.start();
    } else {
      this.animation.close.stop();
      this.animation.open.start();
    }
  };

  generateAnimationFunc = (childrenElements) => {
    const childrenProps = childrenElements.props.children;
    if (childrenProps.length > 0) {
      let totalHeight = 0;
      childrenProps.forEach((childrenProp) => {
        totalHeight += (childrenProp.props.image ? 60 : 50);
      });
      this.height.opened.toValue = totalHeight;
    }
    this.animation = {
      open: Animated.parallel([
        Animated.timing(this.state.menuItemChildrenHeight, Object.assign({}, this.height.opened, this.animationEasing)),
        Animated.timing(this.state.menuItemChildrenOpacity, { toValue: 1 }),
      ]),
      close: Animated.parallel([
        Animated.timing(this.state.menuItemChildrenHeight, Object.assign({}, this.height.closed, this.animationEasing)),
        Animated.timing(this.state.menuItemChildrenOpacity, { toValue: 0 }),
      ])
    };
  };

  generateOnPressFunc = () => {
    if (this.props.children) return this.toggleMenuItemChildren;
    if (!this.props.onPress) return this.noop;
    return this.props.onPress;
  };

  render() {
    const {
      image, text, contentRight, bordered, isLastItem, style, children, childItem
    } = this.props;
    const hasImage = image && Object.keys(image).length > 0 && image.uri.length > 0;
    const onPressFn = this.generateOnPressFunc();
    const isBordered = bordered && !isLastItem;
    const activeOpacity = onPressFn ? 0.8 : 1;
    if (children && Object.keys(this.animation).length === 0) this.generateAnimationFunc(children);
    return (
      <View>
        <TouchableOpacity
          style={[
            styles.menuItemWrapper,
            isBordered && styles.menuItemBordered,
            isBordered && childItem && styles.menuItemBorderedBlack,
            style && style,
            this.state.isOpen && styles.menuItemChildrenOpen,
            hasImage && styles.menuItemWrapperWithImage
          ]}
          activeOpacity={activeOpacity}
          onPress={onPressFn}
        >
          {hasImage && <Image uri={image.uri} style={image.style || {}} height={image.height} width={image.width} />}
          <View style={[styles.menuItemTextWrapper, contentRight && styles.menuItemTextWrapperMultipleText]}>
            <Text style={[styles.menuItemTextLeft, text.style && text.style]}>
              {text.content}
            </Text>
            {contentRight || null }
          </View>

        </TouchableOpacity>
        {children && (
          <Animated.View style={{ height: this.state.menuItemChildrenHeight, opacity: this.state.menuItemChildrenOpacity }}>
            {children}
          </Animated.View>
        )}
      </View>);
  }
}

export { MenuItem };
