import React from 'react';
import { View, ScrollView, Animated } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import GuideItem from '../GuideItem';
import withLoadingBar from '../../hocs/WithLoadingBar';


const Guide = ({ guide, translate, ...props }) => {
  this.animVal = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x: this.animVal } } }]);
  return (
    <View {...props}>
      <View style={styles.mainContainer}>
        <ScrollView
          onScroll={onScroll}
          scrollEventThrottle={10}
        >
          {
            guide.map(item => (
              <GuideItem
                key={item.id}
                title={item.name}
                type={item.type}
                season={item.season}
                episodeNumber={item.episode_number}
                image={item.episode_image_url || item.image_url}
                name={item.episode_name}
                timeStart={+item.start_time}
                timeEnd={+item.end_time}
                translate={translate}
              />
            ))
          }
        </ScrollView>
      </View>
    </View>
  );
};

Guide.propTypes = {
  guide: PropTypes.array,
  translate: PropTypes.func.isRequired,
};

Guide.defaultProps = {
  guide: [],
};

export { Guide };

export default withLoadingBar(Guide);
