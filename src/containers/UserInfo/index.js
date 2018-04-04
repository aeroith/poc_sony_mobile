import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import colorPalette from '../../config/colorPalette';
import styles from './styles';
import { actions as userActions } from '../../reducers/user';
import UserAvatar from '../../components/UserAvatar';

@connect(
  null,
  dispatch => ({
    logout: () => dispatch(userActions.logout()),
  })
)
export default class UserInfo extends Component {
  static propTypes = {
    userName: PropTypes.string.isRequired,
    userPicture: PropTypes.objectOf(PropTypes.any).isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const {
      userPicture, userName, logout
    } = this.props;
    return (
      <View style={styles.userInfoWrapper}>
        <UserAvatar style={styles.userAvatar} size={35} name={userName} src={userPicture.data.url} />
        <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">{userName}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
          <Icon name="ios-log-out" size={25} color={colorPalette.white} />
        </TouchableOpacity>
      </View>
    );
  }
}

