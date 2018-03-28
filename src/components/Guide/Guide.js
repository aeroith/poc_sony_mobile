import React from 'react';
import _some from 'lodash/some';
import { View, ScrollView, Animated, PushNotificationIOS } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import GuideItem from '../../containers/GuideItem';
import withLoadingBar from '../../hocs/WithLoadingBar';

const Guide = ({
  guide, translate, notifications, ...props
}) => {
  this.animVal = new Animated.Value(0);
  const onScroll = () => Animated.event(
    [{ nativeEvent: { contentOffset: { x: this.animVal } } }],
    { useNativeDriver: true }
  );
  return (
    <View {...props}>
      <View style={styles.mainContainer}>
        <Animated.ScrollView
          onScroll={onScroll}
          scrollEventThrottle={16}
          style={styles.scrollView}
        >
          {
            guide.map(item => (
              <GuideItem
                key={item.id}
                id={item.id}
                programId={item.program_id}
                title={item.name}
                type={item.type}
                season={item.season}
                episodeNumber={item.episode_number}
                image={item.episode_image_url || item.image_url}
                name={item.episode_name}
                timeStart={+item.start_time}
                timeEnd={+item.end_time}
                notificationActive={_some(notifications, x => x.id === item.id)}
                translate={translate}
              />
            ))
          }
        </Animated.ScrollView>
      </View>
    </View>
  );
};

Guide.propTypes = {
  guide: PropTypes.array,
  translate: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

Guide.defaultProps = {
  guide: [],
};

export { Guide };

export default withLoadingBar(Guide);
