import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Animated, PanResponder, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PushNotification from '../../utils/push-notification';
import styles from './styles';
import ImageWrapper from '../Image';

const moment = require('moment');

const screenWidth = Dimensions.get('window').width;

class NotificationItem extends PureComponent {
  constructor(props) {
    super(props);
    this.translateX = new Animated.Value(0);
    this.translate = this.props.translate;
    this.momentFormat = 'kk:mm';
    this.pushNotification = new PushNotification(this.onNotification).init();
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([null, { dx: this.translateX }]),
      onPanResponderRelease: (e, { vx, dx }) => {
        if (Math.abs(vx) >= 0.5 || Math.abs(dx) >= 0.5 * screenWidth) {
          Animated.timing(this.translateX, {
            toValue: dx > 0 ? screenWidth : -screenWidth,
            duration: 200
          }).start(() => {
            this.props.unsetNotification(this.props.id);
            this.pushNotification.cancelLocalNotifications({ id: this.props.id });
            this.props.onDismiss();
          });
        } else {
          Animated.spring(this.translateX, {
            toValue: 0,
            bounciness: 10
          }).start();
        }
      }
    });
  }

  renderDate = (timeStart, timeEnd, repeated = false, repeatInterval = '') => {
    if (repeated && repeatInterval) {
      return `${this.translate('every')} ${this.translate(repeatInterval)}:${moment.unix(timeStart).format(this.momentFormat)}`;
    }
    return `${moment.unix(timeStart).format(this.momentFormat)} - ${moment.unix(timeEnd).format(this.momentFormat)}`;
  };

  render() {
    return (
      <View {...this.props}>
        <Animated.View
          style={[
            styles.container,
            { transform: [{ translateX: this.translateX }] }
            ]}
          {...this.panResponder.panHandlers}
        >
          <TouchableOpacity activeOpacity={0.8} style={styles.mainTouchableContainer}>
            <View style={styles.imageContainer} >
              <ImageWrapper uri={this.props.image} height={60} width={100} />
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.notificationTextContainer}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.info}>{this.props.season ? `${this.props.translate('season')} ${this.props.season}` : ' '}</Text>
                <Text style={styles.date}>
                  {this.renderDate(
                    this.props.timeStart,
                    this.props.timeEnd,
                    this.props.repeated,
                    this.props.repeatInterval,
                  )}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.iconContainer}>
            <Icon style={styles.moreIcon} name="md-more" size={30} />
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.hiddenMenu}>
          <Animated.View style={[styles.hiddenMenuIconContainer,
            {
              opacity: this.translateX.interpolate({
                inputRange: [0, 20, screenWidth / 2, screenWidth],
                outputRange: [0, 1, 1.2, 1.5]
              }),
              transform: [{
                scale: this.translateX.interpolate({
                  inputRange: [0, 10, screenWidth / 2, screenWidth],
                  outputRange: [0.1, 1, 1.2, 1.5]
                }),
              }]
            }]}
          >
            <Icon style={styles.hiddenMenuIcon} name="ios-trash" size={30} />
          </Animated.View>
          <Animated.View style={[styles.hiddenMenuIconContainer,
            {
              opacity: this.translateX.interpolate({
                inputRange: [-screenWidth, -screenWidth / 2, -20, 0],
                outputRange: [1.5, 1.2, 1, 0]
              }),
              transform: [{
                scale: this.translateX.interpolate({
                  inputRange: [-screenWidth, -screenWidth / 2, 0],
                  outputRange: [1.5, 1.2, 0.8]
                }),
              }]
            }]}
          >
            <Icon style={styles.hiddenMenuIcon} name="ios-trash" size={30} />
          </Animated.View>
        </View>
      </View>
    );
  }
}


export default NotificationItem;
