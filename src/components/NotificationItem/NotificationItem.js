import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Alert, PushNotificationIOS, Platform, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import ImageWrapper from '../Image';

class NotificationItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View {...this.props}>
        <Animated.View style={styles.container} >
          <TouchableOpacity activeOpacity={0.8} style={styles.mainTouchableContainer}>
            <View style={styles.imageContainer} >
              <ImageWrapper height={60} width={100} />
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.notificationTextContainer}>
                <Text style={styles.title}>Arrow</Text>
                <Text style={styles.info}>Season 4</Text>
                <Text style={styles.date}>Every Mon 6pm - 8pm</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.iconContainer}>
            <Icon style={styles.moreIcon} name="md-more" size={30} />
          </TouchableOpacity>
          <View style={styles.hiddenDeleteMenu} />
        </Animated.View>
      </View>
    );
  }
}


export default NotificationItem;
