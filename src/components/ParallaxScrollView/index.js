import React, { Component } from 'react';
import { Animated, Dimensions, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { stickyHeaderStyle } from '../ProgramContent/styles';

const styles = require('./styles');

const window = Dimensions.get('window');

const SCROLLVIEW_REF = 'ScrollView';
const { height: stickyHeaderHeight } = stickyHeaderStyle;
const HEADER_HEIGHT = stickyHeaderHeight * 1.5;

const pivotPoint = (a, b) => a - b - HEADER_HEIGHT;

const renderEmpty = () => <View />;

// Override `toJSON` of interpolated value because of
// an error when serializing style on view inside inspector.
// See: https://github.com/jaysoo/react-native-parallax-scroll-view/issues/23
const interpolate = (value, opts) => {
  const x = value.interpolate(opts);
  x.toJSON = () => x.__getValue();
  return x;
};

// Properties accepted by `ParallaxScrollView`.
const ParallaxScrollViewPropTypes = {
  backgroundColor: PropTypes.string,
  backgroundScrollSpeed: PropTypes.number,
  fadeOutForeground: PropTypes.bool,
  fadeOutBackground: PropTypes.bool,
  contentBackgroundColor: PropTypes.string,
  onChangeHeaderVisibility: PropTypes.func,
  parallaxHeaderHeight: PropTypes.number.isRequired,
  renderBackground: PropTypes.func,
  renderFixedHeader: PropTypes.func,
  renderForeground: PropTypes.func,
  renderScrollComponent: PropTypes.func,
  renderStickyHeader: PropTypes.func,
  stickyHeaderHeight: PropTypes.number,
  contentContainerStyle: ViewPropTypes.style,
  outputScaleValue: PropTypes.number
};

class ParallaxScrollView extends Component {
  constructor(props) {
    super(props);
    if (props.renderStickyHeader && !props.stickyHeaderHeight) {
      console.warn('Property `stickyHeaderHeight` must be set if `renderStickyHeader` is used.');
    }
    if (props.renderParallaxHeader !== renderEmpty && !props.renderForeground) {
      console.warn('Property `renderParallaxHeader` is deprecated. Use `renderForeground` instead.');
    }
    this.state = {
      viewHeight: window.height,
      viewWidth: window.width
    };
    this.scrollY = new Animated.Value(0);
    this._footerComponent = { setNativeProps() {} }; // Initial stub
    this._footerHeight = 0;
    this.opaqueHeader = false;
  }

  render() {
    const {
      backgroundColor,
      backgroundScrollSpeed,
      children,
      contentBackgroundColor,
      fadeOutForeground,
      fadeOutBackground,
      parallaxHeaderHeight,
      renderBackground,
      renderFixedHeader,
      renderForeground,
      renderParallaxHeader,
      renderScrollComponent,
      renderStickyHeader,
      stickyHeaderHeight,
      style,
      contentContainerStyle,
      outputScaleValue,
      ...scrollViewProps
    } = this.props;

    const background = this._renderBackground({
      fadeOutBackground,
      backgroundScrollSpeed,
      backgroundColor,
      parallaxHeaderHeight,
      stickyHeaderHeight,
      renderBackground,
      outputScaleValue
    });
    const foreground = this._renderForeground({
      fadeOutForeground,
      parallaxHeaderHeight,
      stickyHeaderHeight,
      renderForeground: renderForeground || renderParallaxHeader
    });
    const bodyComponent = this._wrapChildren(children, {
      contentBackgroundColor,
      stickyHeaderHeight,
      contentContainerStyle
    });
    const footerSpacer = this._renderFooterSpacer({ contentBackgroundColor });
    const maybeStickyHeader = this._maybeRenderStickyHeader({
      parallaxHeaderHeight,
      stickyHeaderHeight,
      backgroundColor,
      renderFixedHeader,
      renderStickyHeader
    });
    const scrollElement = renderScrollComponent(scrollViewProps);
    return (
      <View
        style={[style, styles.container]}
        onLayout={e => this._maybeUpdateViewDimensions(e)}
      >
        {background}
        {React.cloneElement(
          scrollElement,
          {
            ref: SCROLLVIEW_REF,
            style: [styles.scrollView, scrollElement.props.style],
            scrollEventThrottle: 1,
            // Using Native Driver greatly optimizes performance
            onScroll: Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
              { useNativeDriver: true, listener: this._onScroll.bind(this) }
            )
            // onScroll: this._onScroll.bind(this)
          },
          foreground,
          bodyComponent,
          footerSpacer
        )}
        {maybeStickyHeader}
      </View>
    );
  }

  /*
   * Expose `ScrollView` API so this component is composable with any component that expects a `ScrollView`.
   */
  getScrollResponder() {
    return this.refs[SCROLLVIEW_REF]._component.getScrollResponder();
  }
  getScrollableNode() {
    return this.getScrollResponder().getScrollableNode();
  }
  getInnerViewNode() {
    return this.getScrollResponder().getInnerViewNode();
  }
  scrollTo(...args) {
    this.getScrollResponder().scrollTo(...args);
  }
  setNativeProps(props) {
    this.refs[SCROLLVIEW_REF].setNativeProps(props);
  }

  /*
   * Private helpers
   */

  _onScroll(e) {
    const {
      parallaxHeaderHeight,
      stickyHeaderHeight,
      onChangeHeaderVisibility,
      onScroll: prevOnScroll = (e) => {}
    } = this.props;
    if (this.props.scrollEvent) {
      this.props.scrollEvent(e);
    }
    const p = pivotPoint(parallaxHeaderHeight, stickyHeaderHeight);
    // console.log('p =>', p);
    // console.log('e.nativeEvent.contentOffset.y =>', e.nativeEvent.contentOffset.y);
    // This optimization wont run, since we update the animation value directly in onScroll event
    // this._maybeUpdateScrollPosition(e)

    if (e.nativeEvent.contentOffset.y >= p) {
      if (this.opaqueHeader === false) {
        this.opaqueHeader = true;
        onChangeHeaderVisibility(false);
      }
    } else if (this.opaqueHeader === true) {
      this.opaqueHeader = false;
      onChangeHeaderVisibility(true);
    }

    prevOnScroll(e);
  }

  // This optimizes the state update of current scrollY since we don't need to
  // perform any updates when user has scrolled past the pivot point.
  _maybeUpdateScrollPosition(e) {
    const { parallaxHeaderHeight, stickyHeaderHeight } = this.props;
    const { scrollY } = this;
    const { nativeEvent: { contentOffset: { y: offsetY } } } = e;
    const p = pivotPoint(parallaxHeaderHeight, stickyHeaderHeight);
    if (offsetY <= p || scrollY._value <= p) {
      scrollY.setValue(offsetY);
    }
  }

  _maybeUpdateViewDimensions(e) {
    const { nativeEvent: { layout: { width, height } } } = e;

    if (width !== this.state.viewWidth || height !== this.state.viewHeight) {
      this.setState({
        viewWidth: width,
        viewHeight: height
      });
    }
  }

  _renderBackground({
    fadeOutBackground,
    backgroundScrollSpeed,
    backgroundColor,
    parallaxHeaderHeight,
    stickyHeaderHeight,
    renderBackground,
    outputScaleValue
  }) {
    const { viewWidth, viewHeight } = this.state;
    const { scrollY } = this;
    const p = pivotPoint(parallaxHeaderHeight, stickyHeaderHeight);
    return (
      <Animated.View
        style={[
          styles.backgroundImage,
          {
            backgroundColor,
            height: parallaxHeaderHeight,
            width: viewWidth,
            opacity: fadeOutBackground
              ? interpolate(scrollY, {
                inputRange: [0, p * (1 / 2), p * (3 / 4), p],
                outputRange: [1, 0.3, 0.1, 0],
                extrapolate: 'clamp'
              })
              : 1,
            transform: [
              {
                translateY: interpolate(scrollY, {
                  inputRange: [0, p],
                  outputRange: [0, -(p / backgroundScrollSpeed)],
                  extrapolateRight: 'extend',
                  extrapolateLeft: 'clamp'
                })
              },
              {
                scale: interpolate(scrollY, {
                  inputRange: [-viewHeight, 0],
                  outputRange: [outputScaleValue, 1],
                  extrapolate: 'clamp'
                })
              }
            ]
          }
        ]}
      >
        <View>
          {renderBackground()}
        </View>
      </Animated.View>
    );
  }

  _renderForeground({
    fadeOutForeground,
    parallaxHeaderHeight,
    stickyHeaderHeight,
    renderForeground
  }) {
    const { scrollY } = this;
    const p = pivotPoint(parallaxHeaderHeight, stickyHeaderHeight);
    return (
      <View style={styles.parallaxHeaderContainer}>
        <Animated.View
          style={[
            styles.parallaxHeader,
            {
              height: parallaxHeaderHeight,
              opacity: fadeOutForeground
                ? interpolate(scrollY, {
                    inputRange: [0, p * (1 / 2), p * (3 / 4), p],
                    outputRange: [1, 0.3, 0.1, 0],
                    extrapolate: 'clamp'
                  })
                : 1
            }
          ]}
        >
          <View style={{ height: parallaxHeaderHeight }}>
            {renderForeground()}
          </View>
        </Animated.View>
      </View>
    );
  }

  _wrapChildren(
    children,
    { contentBackgroundColor, stickyHeaderHeight, contentContainerStyle }
  ) {
    const { viewHeight } = this.state;
    const containerStyles = [{ backgroundColor: contentBackgroundColor }];

    if (contentContainerStyle) containerStyles.push(contentContainerStyle);

    return (
      <View
        style={containerStyles}
        onLayout={(e) => {
          // Adjust the bottom height so we can scroll the parallax header all the way up.
          const { nativeEvent: { layout: { height } } } = e;
          const footerHeight = Math.max(
            0,
            viewHeight - height - stickyHeaderHeight
          );
          if (this._footerHeight !== footerHeight) {
            this._footerComponent.setNativeProps({
                style: { height: footerHeight }
            });
            this._footerHeight = footerHeight;
          }
        }}
      >
        {children}
      </View>
    );
  }

  _renderFooterSpacer({ contentBackgroundColor }) {
    return (
      <View
        ref={ref => (this._footerComponent = ref)}
        style={{ backgroundColor: contentBackgroundColor }}
      />
    );
  }

  _maybeRenderStickyHeader({
    parallaxHeaderHeight,
    stickyHeaderHeight,
    backgroundColor,
    renderFixedHeader,
    renderStickyHeader
  }) {
    const { viewWidth } = this.state;
    const { scrollY } = this;
    if (renderStickyHeader || renderFixedHeader) {
      const p = pivotPoint(parallaxHeaderHeight, stickyHeaderHeight);
      return (
        <View
          style={[
            styles.stickyHeader,
            {
              width: viewWidth,
              ...(stickyHeaderHeight ? { height: stickyHeaderHeight } : null)
            }
          ]}
        >
          {renderStickyHeader
            ? (
              <Animated.View
                style={{
                  backgroundColor,
                  height: stickyHeaderHeight,
                  opacity: interpolate(scrollY, {
                    inputRange: [0, p],
                    outputRange: [0, 1],
                    extrapolate: 'clamp'
                  })
                }}
              >
                <Animated.View
                  style={{
                    transform: [
                      {
                        translateY: interpolate(scrollY, {
                          inputRange: [0, p],
                          outputRange: [stickyHeaderHeight, 0],
                          extrapolate: 'clamp'
                        })
                      }
                    ]
                  }}
                >
                  {renderStickyHeader()}
                </Animated.View>
              </Animated.View>
            )
            : null}
          {renderFixedHeader && renderFixedHeader()}
        </View>
      );
    }
    return null;
  }
}

ParallaxScrollView.propTypes = ParallaxScrollViewPropTypes;

ParallaxScrollView.defaultProps = {
  backgroundScrollSpeed: 5,
  backgroundColor: '#000',
  contentBackgroundColor: '#fff',
  fadeOutForeground: true,
  onChangeHeaderVisibility: () => {},
  renderScrollComponent: props => <Animated.ScrollView {...props} />,
  renderBackground: renderEmpty,
  renderParallaxHeader: renderEmpty, // Deprecated (will be removed in 0.18.0)
  renderForeground: null,
  stickyHeaderHeight: 0,
  contentContainerStyle: null,
  outputScaleValue: 5
};

export default ParallaxScrollView;
