import React from 'react';
import { View, ScrollView, Animated } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import GuideItem from '../GuideItem';
import withLoadingBar from '../../hocs/WithLoadingBar';


const Guide = ({ guide, translate, lang, ...props }) => {
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
                image={item.episode_image_url || item.image_url}
                note={item.episode_description}
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
  lang: PropTypes.string.isRequired,
};

Guide.defaultProps = {
  guide: [],
};

export { Guide };

export default withLoadingBar(Guide);
