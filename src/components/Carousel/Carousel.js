import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { View, ScrollView, Image, Animated, Text, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import styles from './styles';

const FIXED_BAR_WIDTH = 280;
const BAR_SPACE = 10;

export default class Carousel extends Component {
  static propTypes = {
    images: PropTypes.array,
    page: PropTypes.number,
    setCarouselPage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    images: [],
    page: 0,
  };

  constructor(props) {
    super(props);
    this.animVal = new Animated.Value(0);
    this.state = {
      numItems: this.props.images.length
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.images && nextProps.images.length !== this.state.numItems) {
      this.setState({ numItems: nextProps.images.length });
    }
  }


  onScroll = () => Animated.event([{ nativeEvent: { contentOffset: { x: this.animVal } } }]);

  handlePageChange = (e) => {
    const offset = e.nativeEvent.contentOffset;
    if (offset) {
      const page = Math.round(offset.x / width);
      if (this.props.page !== page) {
        this.props.setCarouselPage(page);
      }
    }
  };

  render() {
    if (!this.props.images || _.isEmpty(this.props.images)) {
      return null;
    }

    return (
      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.scrollContainer}
          horizontal
          pagingEnabled
          scrollEventThrottle={10}
          onMomentumScrollEnd={this.handlePageChange}
          onScroll={this.onScroll}
        >
          {
            this.props.images.map(({ imageURL, id }) => (
              <View key={id + 2}>
                <Image style={styles.image} source={{ uri: imageURL }} key={id} />
                <View key={id + 1} style={styles.innerFrame} />
              </View>
            ))
          }
        </ScrollView>
        <View>
          <Text style={styles.mainHeader}>Arrow</Text>
          <View style={styles.subContainer}>
            <Text style={styles.subHeader}>Season 2 - Episode 3</Text>
            <Indicator activeIndex={this.props.page} count={this.state.numItems} />
          </View>
        </View>
      </View>
    );
  }
}

const Indicator = ({ activeIndex, count }) => _.times(count, num =>
  (<View key={num.toString()} style={[styles.indicator, num === activeIndex && styles.indicatorActive]} />));
