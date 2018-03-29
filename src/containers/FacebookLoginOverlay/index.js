import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Zocial';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import colorPalette from '../../config/colorPalette';
import withTranslation from '../../hocs/Translation';

@withTranslation
export default class FacebookLoginOverlay extends Component {
  static propTypes = {
    translate: PropTypes.func.isRequired
  };

  handleLoginWithFacebook = () => {
    console.log('Login with Facebook');
  };
  
  handleCancelLogin = () => {
    console.log('Login canceled');
  };

  render() {
    const { translate } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Sony Channel Mobile</Text>
        <TouchableOpacity
          onPress={this.handleLoginWithFacebook}
          style={styles.facebookLoginButton}
          activeOpacity={0.8}
        >
          <View style={styles.facebookLoginButtonIconWrapper}>
            <Icon
              name="facebook"
              color={colorPalette.white}
              size={14}
            />
          </View>
          <Text
            style={styles.facebookLoginButtonText}
          >
            {translate('login_with_facebook').toUpperCase()}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.handleCancelLogin}
          style={styles.cancelLoginButton}
          activeOpacity={0.8}
        >
          <Text
            style={styles.cancelLoginButtonText}
          >
            {translate('cancel_login').toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
