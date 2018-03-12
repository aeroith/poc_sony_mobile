import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, Animated, UIManager, LayoutAnimation } from 'react-native';
import NotificationItem from '../../containers/NotificationItem';
import styles from './styles';
import { actions as notificationActions } from '../../reducers/notification';
import withTranslation from '../../hocs/Translation/index';

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
    translate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.animVal = new Animated.Value(0);
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  onDismiss = () => LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

  onScroll = Animated.event([{ nativeEvent: { contentOffset: { x: this.animVal } } }]);

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer} />
        <ScrollView
          onScroll={this.onScroll}
          scrollEventThrottle={10}
          contentContainerStyle={styles.scrollViewContainer}
        >
          {
            this.props.notifications.map((item) => {
              const {
               title, image, episodeNumber, timeStart, timeEnd, type, season, id, repeated
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
                  translate={this.props.translate}
                  unsetNotification={this.props.unsetNotification}
                  onDismiss={this.onDismiss}
                />
              );
            })
          }
        </ScrollView>
      </View>
    );
  }
}
