import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Alert, PushNotificationIOS, Platform } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Image from '../Image';
import styles from './styles';
import PushNotification from '../../utils/push-notification';

const moment = require('moment');

export default class GuideItem extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    season: PropTypes.number,
    episodeNumber: PropTypes.number,
    timeStart: PropTypes.number.isRequired,
    timeEnd: PropTypes.number.isRequired,
    translate: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    unsetNotification: PropTypes.func.isRequired,
    notificationActive: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    season: null,
    episodeNumber: null,
    image: 'https://dummyimage.com/100x60/2d5d61/fff.png&text=Placeholder',
  };

  constructor(props) {
    super(props);
    this.translate = this.props.translate;
    this.pushNotification = new PushNotification(this.onNotification).init();
  }

  onContentPress = () => console.log('Guide Item Content Pressed');

  onNotificationIconPress = () => {
    if (this.props.notificationActive) {
      this.props.unsetNotification(this.props.id);
      this.pushNotification.cancelLocalNotifications({ id: this.props.id });
    } else {
      this.notificationAlert();
    }
  };

  onNotification = (notification) => {
    if (Platform.OS === 'ios') {
      this.props.unsetNotification(notification.data.id);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    } else {
      this.props.unsetNotification(+notification.id);
    }
  };

  setActiveIconRef = ref => this.activeIconRef = ref;


  notificationAlert = () => {
    const { translate } = this.props;
    return Alert.alert(
      translate('set_notification'),
      translate('set_notification_extended'),
      [
        {
          text: translate('cancel'),
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: translate('ok'),
          onPress: () => {
            this.props.setNotification({
              id: this.props.id,
              title: this.props.title,
              season: this.props.season,
              type: this.props.type,
              episodeNumber: this.props.episodeNumber,
              image: this.props.image,
              timeStart: this.props.timeStart,
              timeEnd: this.props.timeEnd,
              repeated: false,
            });
            this.activeIconRef.shake(300);
            if (Platform.OS === 'ios') {
              this.pushNotification.localNotificationSchedule({
                message: `${this.props.title} ${this.translate('notification_msg')}`,
                date: new Date((this.props.timeStart - 600) * 1000),
                userInfo: {
                  id: this.props.id
                },
              });
            } else {
              this.pushNotification.localNotificationSchedule({
                id: this.props.id.toString(),
                message: `${this.props.title} ${this.translate('notification_msg')}`,
                date: new Date((this.props.timeStart - 600) * 1000),
              });
            }
          },
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
        <TouchableOpacity
          onPress={this.onContentPress}
          style={styles.guideItemMainContainer}
          activeOpacity={0.8}
        >
          <View style={styles.guideItemImageContainer} >
            <Image
              style={styles.guideItemImage}
              uri={image}
              width={100}
              height={60}
            />
          </View>
          <View style={styles.guideItemContentContainer} >
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
          </View>
          <TouchableOpacity
            style={styles.guideItemNotificationContainer}
            onPress={this.onNotificationIconPress}
          >
            {
              this.props.notificationActive ?
                <AnimatableView ref={this.setActiveIconRef}>
                  {
                    Platform.OS === 'ios' ?
                      <Icon name="ios-notifications" size={30} style={styles.guideItemNotificationIconActive} /> :
                      <Icon name="md-notifications" size={30} style={styles.guideItemNotificationIconActive} />
                  }
                </AnimatableView> :
                <AnimatableView>
                  {
                    Platform.OS === 'ios' ?
                      <Icon name="ios-notifications-off-outline" size={30} style={styles.guideItemNotificationIcon} /> :
                      <Icon name="md-notifications-off" size={30} style={styles.guideItemNotificationIcon} />
                  }
                </AnimatableView>
            }
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }
}
