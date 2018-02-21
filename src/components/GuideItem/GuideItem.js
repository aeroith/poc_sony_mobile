import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export default class GuideItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      notificationEnabled: false,
    };
  }

  onNotificationIconPress = () => (
    this.state.notificationEnabled ?
      this.setState({
        notificationEnabled: false
      }) :
      this.notificationAlert()
  );

  notificationAlert = () => Alert.alert(
    'Set Notification',
    'Remind me 10 minutes from the start?',
    [
      {
        text: 'Cancel',
        onPress: () => this.setState({
          notificationEnabled: false
        }),
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => this.setState({
          notificationEnabled: true
        }),
      },
    ],
    { cancellable: false }
  );

  onContentPress = () => console.log('Guide Item Content Pressed')

  render() {
    return (
      <View {...this.props}>
        <View style={styles.guideItemMainContainer}>
          <TouchableOpacity
            onPress={this.onContentPress}
            style={styles.guideItemImageContainer}
          >
            <Image
              style={styles.guideItemImage}
              source={{uri: 'https://yt3.ggpht.com/a-/AJLlDp3MkZbnThs83KWXV7OIA4trD8TpggRsZLGUCA=s900-mo-c-c0xffffffff-rj-k-no' }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onContentPress}
            style={styles.guideItemContentContainer}
          >
            <View>
              <Text style={styles.guideItemTextTitle}>Seinfield</Text>
              <Text style={styles.guideItemTextSubtitle}>S2 E09: Changing Lives</Text>
              <View style={styles.guideItemAiringContainer}>
                <Icon name="ios-time-outline" size={12} style={styles.guideItemIconAiring} />
                <Text style={styles.guideItemTextAiring}>4:00pm - 5:00pm</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.guideItemNotificationContainer}>
            <TouchableOpacity onPress={this.onNotificationIconPress}>
              {
                this.state.notificationEnabled ?
                  <Icon name="ios-notifications-outline" size={30} style={styles.guideItemNotificationIcon} /> :
                  <Icon name="ios-notifications-off-outline" size={30} style={styles.guideItemNotificationIcon} />
              }
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
