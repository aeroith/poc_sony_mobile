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
  state => ({
    liveUrl: state.app.liveUrl,
    posterImage: state.app.posterImage,
  }),
  appActions
)
export default class LiveFeed extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
    liveUrl: PropTypes.string,
    posterImage: PropTypes.string,
  };

  static defaultProps = {
    liveUrl: undefined,
  };

  render() {
    if (!this.props.liveUrl) {
      return null;
    }
    return (
      <View style={styles.container}>
        <VideoPlayer
          poster={this.props.posterImage}
          navigator={this.props.navigation}
          paused
          translate={this.props.translate}
          source={{ uri: this.props.liveUrl }}
          {...this.props}
        />
      </View>
    );
  }
}
