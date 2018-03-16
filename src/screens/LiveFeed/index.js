import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Dimensions, ImageBackground } from 'react-native';
import { BlurView } from 'react-native-blur';
import styles from './styles';
import withTranslation from '../../hocs/Translation/index';
import VideoPlayer from '../../components/VideoPlayer';
import { actions as appActions } from '../../reducers/app';

const { width, height } = Dimensions.get('window');

@withTranslation
@connect(
  null,
  appActions
)
export default class LiveFeed extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired
  };

  render() {
    return (
      <ImageBackground style={styles.container} source={require('../../assets/img/bg2.png')}>
          <VideoPlayer
            {...this.props}
            navigator={this.props.navigation}
            paused
            source={{ uri: 'https://planet-live.ercdn.net/sony/sony_1080p.m3u8' }}
          />
      </ImageBackground>
    );
  }
}
