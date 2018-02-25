import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _find from 'lodash/find';
import Image from '../../components/Image';
import styles from './styles';
import withTranslation from '../../hocs/Translation';
import Utils from '../../utils/utils';
import routeMappings from '../../config/routeMappings';
import { resetAction } from '../../reducers/nav';

@withTranslation
@connect(state => ({
  channelName: state.app.channelName,
  connectedChannels: state.app.connectedChannels,
  channelLogo: state.app.channelLogo,
  country: state.app.country,
  menu: state.app.menu,
}))
export default class MenuContent extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    setDrawerState: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    channelName: PropTypes.string.isRequired,
    connectedChannels: PropTypes.arrayOf(PropTypes.string),
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

  handleMenuItemClick = (item, currentRouteName) => {
    const { routeName } = _find(routeMappings, { enum: item });
    if (currentRouteName !== routeName) {
      this.props.navigation.dispatch(resetAction(routeName, currentRouteName));
    }
  };

  render() {
    const {
      channelLogo, channelName, menu, translate
    } = this.props;
    const route = Utils.getCurrentRoute(this.props.navigation.state);
    return (
      <View style={styles.menuContentWrapper}>
        <MenuItem
          bordered
          style={styles.channelName}
          image={{ uri: channelLogo, style: styles.channelInfoImage }}
          text={{ content: translate(channelName), style: styles.channelInfoText }}
        />
        <ScrollView>
          {menu.length > 0 && menu.map(item => (
            <MenuItem
              bordered
              touchable
              style={[route.enum === item && styles.selectedMenuItem]}
              text={{ content: translate(`menu.${channelName}.${item}`) }}
              key={item + menu.indexOf(item)}
              onPress={() => this.handleMenuItemClick(item, route.routeName)}
            />
            ))}
        </ScrollView>
      </View>
    );
  }
}

const MenuItem = (props) => {
  const { image, text } = props;
  const activeOpacity = props.onPress ? 0.8 : 1;
  const noop = () => {};
  return (
    <TouchableOpacity
      style={[styles.menuItemWrapper, props.style && props.style, props.bordered && styles.menuItemBordered]}
      activeOpacity={activeOpacity}
      onPress={props.onPress || noop}
    >
      {props.image
      && Object.keys(props.image).length > 0
      && <Image uri={image.uri} style={image.style} />}
      <Text style={[styles.menuItemText, props.text.style && props.text.style]}>
        {text.content}
      </Text>
    </TouchableOpacity>
  );
};

MenuItem.propTypes = {
  style: PropTypes.any,
  image: PropTypes.objectOf(PropTypes.any),
  text: PropTypes.objectOf(PropTypes.any).isRequired,
};

MenuItem.defaultProps = {
  image: {},
  style: {}
};

export { MenuItem };
