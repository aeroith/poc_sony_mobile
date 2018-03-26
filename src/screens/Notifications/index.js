import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, Animated, UIManager, LayoutAnimation, Platform, PushNotificationIOS, Text, Dimensions, Easing, TouchableOpacity } from 'react-native';
import NotificationItem from '../../containers/NotificationItem';
import styles from './styles';
import { actions as notificationActions } from '../../reducers/notification';
import withTranslation from '../../hocs/Translation/index';
import PushNotification from '../../utils/push-notification';
import ImageWrapper from '../../components/Image';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

@connect(
  state => ({
    notifications: state.notification.notifications
  }),
  notificationActions,
)
@withTranslation
export default class Notifications extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
    unsetNotification: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.animVal = new Animated.Value(0);
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.pushNotification = new PushNotification(this.onNotification).init();
    this.translateY = new Animated.Value(deviceHeight - 200);
    this.state = {
      hiddenMenu: {}
    };
  }

  onDismiss = () => LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

  onScroll = () => Animated.event(
    [{ nativeEvent: { contentOffset: { x: this.animVal } } }],
    { useNativeDriver: true }
  );

  handleHiddenMenuClick = (item) => {
    this.setState({
      hiddenMenu: item,
    }, () => Animated.timing(this.translateY, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true
    }).start());
  };

  dismissHiddenMenu = () => {
    Animated.timing(this.translateY, {
      toValue: deviceHeight - 200,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true
    }).start(() => this.setState({
      hiddenMenu: {}
    }));
  };

  cancelAnimationFromHiddenMenu = () => {
    this.props.unsetNotification(this.state.hiddenMenu.id);
    this.dismissHiddenMenu();
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          onScroll={this.onScroll}
          scrollEventThrottle={10}
        >
          {
            this.props.notifications.map((item) => {
              const {
                title,
                image,
                episodeNumber,
                timeStart,
                timeEnd,
                type,
                season,
                id,
                repeated,
                repeatInterval
              } = item;
              return (
                <NotificationItem
                  key={id}
                  id={id}
                  style={styles.notificationItem}
                  title={title}
                  image={image}
                  episodeNumber={episodeNumber}
                  timeStart={timeStart}
                  timeEnd={timeEnd}
                  type={type}
                  season={season}
                  repeated={repeated}
                  repeatInterval={repeatInterval}
                  translate={this.props.translate}
                  unsetNotification={this.props.unsetNotification}
                  onDismiss={this.onDismiss}
                  pushNotification={this.pushNotification}
                  hiddenMenuClick={this.handleHiddenMenuClick}
                />
              );
            })
          }
        </ScrollView>
        <Animated.View style={[
          styles.moreMenu,
          {
            transform: [{ translateY: this.translateY }],
            opacity: this.translateY.interpolate({
              inputRange: [0, deviceHeight - 200],
              outputRange: [1, 0]
            })
          }
        ]}
        >
          <Animated.View style={[
            styles.moreMenuBg,
            {
              opacity: this.translateY.interpolate({
                inputRange: [0, deviceHeight - 200],
                outputRange: [0.8, 0]
              })
            }
          ]}
          />
          {this.state.hiddenMenu.image && (
            <ImageWrapper
              style={styles.moreMenuImg}
              uri={this.state.hiddenMenu.image}
              height={200}
              width={deviceWidth - 100}
            />
          )}
          {this.state.hiddenMenu.type === 'tv' &&
          <TouchableOpacity style={styles.moreMenuTouchable}>
            <Text style={styles.moreMenuText}>{this.props.translate('go_to_episode')}</Text>
          </TouchableOpacity>}
          <TouchableOpacity style={styles.moreMenuTouchable}>
            <Text style={styles.moreMenuText}>{this.props.translate('go_to_detail')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.cancelAnimationFromHiddenMenu}
            style={styles.moreMenuTouchable}
          >
            <Text style={styles.moreMenuText}>{this.props.translate('cancel_notification')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.dismissHiddenMenu} style={styles.moreMenuTouchable}>
            <Text style={styles.moreMenuText}>{this.props.translate('cancel')}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}
