import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Zocial';
import { connect } from 'react-redux';
import { View as AnimatableView } from 'react-native-animatable';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import colorPalette from '../../config/colorPalette';
import withTranslation from '../../hocs/Translation';
import { actions as appActions } from '../../reducers/app';
import { actions as userActions } from '../../reducers/user';

@withTranslation
@connect(
  state => ({
    isLoginScreenVisible: state.app.isLoginScreenVisible,
  }),
  dispatch => ({
    setLoginScreenVisibility: isVisible => dispatch(appActions.setLoginScreenVisibility(isVisible)),
    login: permissions => dispatch(userActions.login(permissions)),
    getPublicInfo: () => dispatch(userActions.getPublicInfo()),
  }),
)
export default class LoginOverlay extends Component {
  static propTypes = {
    translate: PropTypes.func.isRequired,
    setLoginScreenVisibility: PropTypes.func.isRequired,
  };

  permissions = ['public_profile'];

  handleLoginWithFacebook = () => {
    this.props.login(this.permissions)
      .then(() => {
        this.props.getPublicInfo();
        this.handleCancelLogin();
      })
      .catch(console.log)
  };

  handleCancelLogin = () => {
    this.animatableView.fadeOutDown().then(() => {
      this.props.setLoginScreenVisibility(false);
    });
  };

  handleViewRef = (animatableView) => {
    this.animatableView = animatableView;
  };

  render() {
    const { translate } = this.props;
    return (
      <AnimatableView
        animation="fadeInUp"
        style={styles.container}
        ref={this.handleViewRef}
        useNativeDriver
      >
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
              size={16}
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
      </AnimatableView>
    );
  }
}
