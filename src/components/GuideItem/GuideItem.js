import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export default class GuideItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      notificationEnabled: false,
    };
  }

  onNotificationIconPress = () => this.setState({
    notificationEnabled: !this.state.notificationEnabled
  });

  render() {
    return (
      <View {...this.props}>
        <View style={styles.guideItemMainContainer}>
          <View style={styles.guideItemImageContainer}>
            <Image
              style={styles.guideItemImage}
              source={{uri: 'https://yt3.ggpht.com/a-/AJLlDp3MkZbnThs83KWXV7OIA4trD8TpggRsZLGUCA=s900-mo-c-c0xffffffff-rj-k-no' }}
            />
          </View>
          <View style={styles.guideItemContentContainer}>
            <Text style={{color: 'white'}}>Seinfield</Text>
            <Text style={{color: 'white'}}>S2 E09: Changing Lives</Text>
            <Text style={{color: 'white'}}>4:00pm - 5:00pm</Text>
          </View>
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