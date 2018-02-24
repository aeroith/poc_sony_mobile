import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import GuideItem from '../GuideItem';
import config from '../../config/config';
import withLoadingBar from '../../hocs/WithLoadingBar';

const Guide = ({ guide, translate, ...props }) => (
  <View {...props}>
    <View style={styles.mainContainer}>
      <ScrollView>
        {
          guide.map(item => (
            <GuideItem
              key={item.id}
              title={item.title}
              image={item.imageURL}
              note={item.note[config.lang]}
              timeStart={item.timeStart}
              timeEnd={item.timeEnd}
              translate={translate}
            />
          ))
        }
      </ScrollView>
    </View>
  </View>
);

Guide.propTypes = {
  guide: PropTypes.array,
  translate: PropTypes.func.isRequired,
};

Guide.defaultProps = {
  guide: [],
};

export { Guide };

export default withLoadingBar(Guide);
