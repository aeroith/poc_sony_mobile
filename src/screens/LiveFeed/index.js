import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from './styles';
import withTranslation from '../../hocs/Translation/index';
import VideoPlayer from '../../components/VideoPlayer';
import { actions as appActions } from '../../reducers/app';

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
        <VideoPlayer {...this.props} source={{uri: "https://planet-live.ercdn.net/sony/sony_1080p.m3u8"}} />
      </View>
    );
  }
}
