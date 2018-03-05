import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Image from '../Image';
import styles from './styles';

const moment = require('moment');

export default class GuideItem extends PureComponent {
  static propTypes = {
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    season: PropTypes.number,
    episodeNumber: PropTypes.number,
    timeStart: PropTypes.number.isRequired,
    timeEnd: PropTypes.number.isRequired,
    translate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    season: null,
    episodeNumber: null,
    image: 'https://dummyimage.com/100x60/2d5d61/fff.png&text=Placeholder',
  };

  constructor(props) {
    super(props);
    this.state = {
      notificationEnabled: false,
    };
    this.translate = this.props.translate;
  }

  onNotificationIconPress = () => (
    this.state.notificationEnabled ?
      this.setState({
        notificationEnabled: false
      }) :
      this.notificationAlert()
  );

  onContentPress = () => console.log('Guide Item Content Pressed');

  notificationAlert = () => {
    const { translate } = this.props;
    return Alert.alert(
      translate('set_notification'),
      translate('set_notification_extended'),
      [
        {
          text: translate('cancel'),
          onPress: () => this.setState({
            notificationEnabled: false
          }),
          style: 'cancel'
        },
        {
          text: translate('ok'),
          onPress: () => this.setState({
            notificationEnabled: true
          }),
        },
      ],
      { cancellable: false }
    );
  };

  renderNoteField = (type, name, season, episode_number) => {
    if (!type || !name) return ' ';
    if (type === 'movie' || !season || !episode_number) {
      return name;
    }
    const normalize = field => (+field < 10 ? `0${field.toString()}` : field);
    return `${this.translate('season_short')}${normalize(season)} ${this.translate('episode_short')}${normalize(episode_number)}: ${name}`;
  };

  render() {
    const {
      image, title, name, timeStart, timeEnd, type, season, episodeNumber, ...props
    } = this.props;
    const startTime = moment.unix(timeStart).format('h:mma');
    const endTime = moment.unix(timeEnd).format('h:mma');
    return (
      <View {...props}>
        <View style={styles.guideItemMainContainer}>
          <TouchableOpacity
            onPress={this.onContentPress}
            style={styles.guideItemImageContainer}
          >
            <Image
              style={styles.guideItemImage}
              uri={image}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onContentPress}
            style={styles.guideItemContentContainer}
          >
            <View>
              <Text style={styles.guideItemTextTitle}>{title}</Text>
              <Text style={styles.guideItemTextSubtitle}>
                {this.renderNoteField(type, name, season, episodeNumber)}
              </Text>
              <View style={styles.guideItemAiringContainer}>
                <Icon name="ios-time-outline" size={12} style={styles.guideItemIconAiring} />
                <Text style={styles.guideItemTextAiring}>{`${startTime} - ${endTime}`}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.guideItemNotificationContainer}
            onPress={this.onNotificationIconPress}
          >
            {
              this.state.notificationEnabled ?
                <Icon name="ios-notifications-outline" size={30} style={styles.guideItemNotificationIcon} /> :
                <Icon name="ios-notifications-off-outline" size={30} style={styles.guideItemNotificationIcon} />
            }
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
