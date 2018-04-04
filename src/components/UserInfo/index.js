import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colorPalette from '../../config/colorPalette';
import styles from './styles';
import UserAvatar from '../UserAvatar/index';

export default class UserInfo extends Component {
  static propTypes = {
    userName: PropTypes.string.isRequired,
    userPicture: PropTypes.objectOf(PropTypes.any).isRequired,
    logout: PropTypes.func.isRequired,
    setLoginVisibility: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
  };

  handleLogout = () => {
    Alert.alert(
      this.props.translate('logout_alert_message_title'),
      this.props.translate('logout_alert_message_text'),
      [
        {
          text: this.props.translate('logout'),
          onPress: () => {
            this.props.setLoginVisibility(true);
            this.props.logout();
          }
        },
        { text: this.props.translate('cancel'), onPress: () => console.log('Sign Out Aborted'), style: 'cancel' },
      ],
      { cancelable: false }
    );
  };

  render() {
    const {
      userPicture, userName
    } = this.props;
    return (
      <View style={styles.userInfoWrapper}>
        <UserAvatar
          style={styles.userAvatar}
          size={35}
          name={userName}
          src={userPicture.data.url}
        />
        <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">{userName}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={this.handleLogout}>
          <Icon name="ios-log-out" size={25} color={colorPalette.white} />
        </TouchableOpacity>
      </View>
    );
  }
}

