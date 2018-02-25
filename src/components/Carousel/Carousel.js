import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { View, ScrollView, Image, Animated, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Tag from '../Tag';
import withLoadingBar from '../../hocs/WithLoadingBar';
import styles from './styles';

const { width: initialWidth, height: initialHeight } = Dimensions.get('window');

@withLoadingBar
class Carousel extends PureComponent {
  static propTypes = {
    images: PropTypes.array,
    page: PropTypes.number,
    setCarouselPage: PropTypes.func.isRequired,
    resetCarousel: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
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
    if (this.props.page !== 0) {
      this.props.resetCarousel();
    }
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
          scrollEventThrottle={10}
          onContentSizeChange={this.handleLayoutScrolling}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={this.handlePageChange}
          onScroll={this.onScroll}
        >
          {
            this.props.images.map(({ imageURL, id }) => (
              <TouchableWithoutFeedback onPress={() => console.log('carousel pressed')} key={id}>
                <View key={id + 1}>
                  <Image
                    style={[styles.image, { width: this.state.layout.width }]}
                    source={{ uri: imageURL }}
                  />
                  <View
                    style={[styles.innerFrame, { width: this.state.layout.width }]}
                  />
                </View>
              </TouchableWithoutFeedback>
            ))
          }
        </ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.mainHeaderContainer}>
            <Text style={styles.mainHeader}>{currentSelection.Title}</Text>
            {
              currentSelection.tags
                .slice(0, 2)
                .map((tag, i) => (
                  <Tag
                    key={`${tag}-${i}`}
                    type={tag}
                    text={this.props.translate(tag)}
                    style={[styles.tag, i === 0 && styles.tagFirstChild]}
                  />
              ))
            }
          </View>
          <View style={[styles.subContainer, { width: this.state.layout.width }]}>
            <Text style={styles.subHeader}>{currentSelection.Note || ' '}</Text>
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
        style={[styles.indicator,
          num === activeIndex && styles.indicatorActive,
          num === 0 && styles.indicatorFirstChild]}
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

export default Carousel;
