import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const noop = () => {};
export default class MenuContent extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    drawerActions: PropTypes.object,
  };

  static defaultProps = {
    drawerActions: {
      openDrawer: noop,
      closeDrawer: noop,
    }
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </View>
    );
  }
}
