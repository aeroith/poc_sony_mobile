import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
// TODO For android react-native-linear-gradient should be put into build phase
import LinearGradient from 'react-native-linear-gradient';
import colorPalette from '../../config/colorPalette';
import withTranslation from '../Translation';
import styles from './styles';

@withTranslation
export default class NavBar extends Component {
    static propTypes = {
      translate: PropTypes.func.isRequired,
    };

    getNavHeader = () => {
      const navStackLength = this.props.nav ? this.props.nav.routes.length : 0;
      if (navStackLength === 0) return '';
      const { routeName } = this.props.nav.routes[navStackLength - 1];
      return this.props.translate(routeName.toLowerCase());
    };

    render() {
      return (
        <View style={styles.navBarWrapper}>
          <LinearGradient
            colors={[colorPalette.grayBg3a, colorPalette.transparent]}
            locations={[0.25, 1]}
          >
            <View style={styles.linearGradientWrapper}>
              <Text style={styles.text}>Menu</Text>
              <Text style={styles.navBarText}>{this.getNavHeader()}</Text>
              <Text style={styles.text}>Search</Text>
            </View>
          </LinearGradient>
        </View>

      );
    }
}
