import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
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
    { text: 'settings', iconText: 'ios-settings-outline', },
    { text: 'notifications', iconText: 'ios-notifications-outline', },
    { text: 'other_channels', iconText: 'ios-globe-outline', },
  ];

  handleMenuItemClick = (item, currentRouteName) => {
    const { routeName } = _find(routeMappings, { enum: item });
    if (currentRouteName !== routeName) {
      this.props.navigation.dispatch(resetAction(routeName, currentRouteName));
    }
  };

  render() {
    const {
      channelLogo, channelName, connectedChannels, menu, translate
    } = this.props;
    const route = Utils.getCurrentRoute(this.props.navigation.state);
    const channelEnum = Utils.getChannelEnum(channelName);
    const sisterChannels = connectedChannels.filter(channel => channel.name !== channelName);
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
              key={item + menu.indexOf(item)}
              onPress={() => this.handleMenuItemClick(item, route.routeName)}
            />
            ))}
          {/* Navigations */}
          {MenuContent.navigations.map((navigationItem, index) => (<MenuItem
            bordered
            key={`${navigationItem.text}_${index}`}
            text={{ content: translate(navigationItem.text) }}
            contentRight={<Icon name={navigationItem.iconText} size={25} color={colorPalette.white} />}
          />))}
          {/* Other channels section  */}
          {/*<View style={styles.menuSection}>*/}
            {/*<View style={styles.menuSectionHeader}>*/}
              {/*<Text style={styles.menuSectionHeaderText}>{translate('other_channels').toUpperCase()}</Text>*/}
              {/*<Icon name="globe" size={17} color={colorPalette.white} />*/}
            {/*</View>*/}
            {/*{sisterChannels && sisterChannels.length > 0 && sisterChannels.map((channel, index) => (*/}
              {/*<MenuItem*/}
                {/*key={`${channel.id}_${index}`}*/}
                {/*text={{ content: channel.name }}*/}
              {/*/>*/}
            {/*))}*/}
          {/*</View>*/}

        </ScrollView>

      </View>
    );
  }
}

const MenuItem = (props) => {
  const { image, text, contentRight } = props;
  const activeOpacity = props.onPress ? 0.8 : 1;
  const noop = () => {};
  return (
    <TouchableOpacity
      style={[
          styles.menuItemWrapper,
          props.bordered && !props.isLastItem && styles.menuItemBordered,
          props.style && props.style,
      ]}
      activeOpacity={activeOpacity}
      onPress={props.onPress || noop}
    >
      {props.image
      && Object.keys(props.image).length > 0
      && props.image.uri.length > 0
      && <Image uri={image.uri} style={image.style} height={image.height} width={image.width} />}
      <View style={[styles.menuItemTextWrapper, contentRight && styles.menuItemTextWrapperMultipleText]}>
        <Text style={[styles.menuItemTextLeft, props.text.style && props.text.style]}>
          {text.content}
        </Text>
        {contentRight || null }
      </View>

    </TouchableOpacity>
  );
};

MenuItem.propTypes = {
  style: PropTypes.any,
  image: PropTypes.objectOf(PropTypes.any),
  text: PropTypes.objectOf(PropTypes.any).isRequired,
  bordered: PropTypes.bool,
  isLastItem: PropTypes.bool,
};

MenuItem.defaultProps = {
  image: {},
  style: {},
  bordered: false,
  isLastItem: false,
};

export { MenuItem };
