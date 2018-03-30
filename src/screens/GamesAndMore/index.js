import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import styles from './styles';
import withTranslation from '../../hocs/Translation/index';

const Login = () => (
  <View>
    <LoginButton
      onLoginFinished={
        (error, result) => {
          if (error) {
            console.log("login has error: " + result.error);
          } else if (result.isCancelled) {
            console.log("login is cancelled.");
          } else {
            AccessToken.getCurrentAccessToken().then((data) => {
                console.log(data.accessToken.toString());
              })
          }
        }
      }
      onLogoutFinished={() => console.log("logout.")}/>
  </View>
);

@withTranslation
export default class GamesAndMore extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <Login />
      </View>
    );
  }
}
