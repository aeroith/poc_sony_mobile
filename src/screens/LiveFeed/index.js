import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
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
      <View style={styles.container}>
        <VideoPlayer
          poster="https://i.hizliresim.com/1J3zJ1.jpg"
          title="Bugs Bunny"
          {...this.props}
          navigator={this.props.navigation}
          paused
          source={{ uri: 'https://planet-live.ercdn.net/sony/sony_1080p.m3u8' }}
        />
      </View>
    );
  }
}
