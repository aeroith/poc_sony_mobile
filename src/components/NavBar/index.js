import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './styles';
import withTranslation from '../Translation';

@withTranslation
export default class NavBar extends Component {
    static propTypes = {
      translate: PropTypes.func.isRequired,
    };

    constructor(props) {
      super(props);
    }

    render() {
      return (
        <View style={styles.navBarWrapper}>
          <Text>Menu</Text>
          <Text style={styles.navBarText}>Guide</Text>
          <Text>Search</Text>
        </View>
      );
    }
}
