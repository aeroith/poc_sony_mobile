import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { View, ScrollView, Image, Animated, Text, Dimensions } from 'react-native';
import styles from './styles';

const { width: initialWidth, height: initialHeight } = Dimensions.get('window');

export default class Carousel extends Component {
  static propTypes = {
    images: PropTypes.array,
    page: PropTypes.number,
    setCarouselPage: PropTypes.func.isRequired,
    resetCarousel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    images: [],
    page: 0,
  };

  constructor(props) {
    super(props);
    this.animVal = new Animated.Value(0);
    this.state = {
      numItems: this.props.images.length,
      layout: {
        width: initialWidth,
        height: initialHeight,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.images && nextProps.images.length !== this.state.numItems) {
      this.setState({ numItems: nextProps.images.length });
    }
  }

  componentWillUnmount() {
    this.props.resetCarousel();
  }


  onScroll = () => Animated.event([{ nativeEvent: { contentOffset: { x: this.animVal } } }]);

  onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    this.setState({
      layout: {
        width,
        height,
      }
    });
  };

  setScrollViewRef = (ref) => {
    this.scrollViewRef = ref;
    return null;
  };

  // fixes the weird half screen issue when the device is rotated
  handleLayoutScrolling = () => this.scrollViewRef.scrollTo({
    x: this.state.layout.width * this.props.page,
    y: 0,
    animated: true
  });

  handlePageChange = (e) => {
    const offset = e.nativeEvent.contentOffset;
    if (offset) {
      const page = Math.round(offset.x / this.state.layout.width);
      if (this.props.page !== page) {
        this.props.setCarouselPage(page);
      }
    }
  };

  render() {
    if (!this.props.images || _.isEmpty(this.props.images)) {
      return null;
    }
    const currentSelection = this.props.images[this.props.page];

    return (
      <View style={styles.mainContainer} onLayout={this.onLayout}>
        <ScrollView
          ref={this.setScrollViewRef}
          style={styles.scrollContainer}
          horizontal
          pagingEnabled
          onContentSizeChange={this.handleLayoutScrolling}
          scrollEventThrottle={10}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={this.handlePageChange}
          onScroll={this.onScroll}
        >
          {
            this.props.images.map(({ imageURL, id }) => (
              <View key={id + 2}>
                <Image
                  style={[styles.image, { width: this.state.layout.width }]}
                  source={{ uri: imageURL }}
                  key={id}
                />
                <View
                  key={id + 1}
                  style={[styles.innerFrame, { width: this.state.layout.width }]}
                />
              </View>
            ))
          }
        </ScrollView>
        <View>
          <Text style={styles.mainHeader}>{currentSelection.Title}</Text>
          <View style={[styles.subContainer, { width: this.state.layout.width }]}>
            <Text style={styles.subHeader}>{currentSelection.Note && currentSelection.Note}</Text>
            <Indicator activeIndex={this.props.page} count={this.state.numItems} />
          </View>
        </View>
      </View>
    );
  }
}

const Indicator = ({ activeIndex, count, ...props }) => (
  <View {...props} style={styles.indicatorContainer}>
    {_.times(count, num =>
      (<View
        key={num.toString()}
        style={[styles.indicator, num === activeIndex && styles.indicatorActive]}
      />))}
  </View>
);

Indicator.propTypes = {
  activeIndex: PropTypes.number,
  count: PropTypes.number,
};

Indicator.defaultProps = {
  activeIndex: 0,
  count: 0,
};
