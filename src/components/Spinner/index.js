import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colorPalette from '../../config/colorPalette';

export default class Spinner extends Component {
    static propTypes = {
      wrapperStyle: View.propTypes.style,
      iconSize: PropTypes.number,
      iconStyle: Icon.propTypes.style,
    };

    static defaultProps = {
      iconSize: 20,
      iconStyle: undefined,
      wrapperStyle: undefined,
    };

    constructor(props) {
      super(props);
      this.spinValue = new Animated.Value(0);
    }

    componentDidMount() {
      this.spin();
    }

    spin() {
      this.spinValue.setValue(0);
      Animated.timing(
        this.spinValue,
        {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: true,
        }
      ).start(() => this.spin());
    }

    render() {
      const spin = this.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      });
      const animatedViewStyle = {
        transform: [{ rotate: spin }],
        flexDirection: 'row',
        alignItems: 'center',
      };
      return (
        <View
          style={this.props.wrapperStyle}
        >
          <Animated.View style={animatedViewStyle}>
            <Icon
              style={this.props.iconStyle || { paddingBottom: 1 }}
              name="loader"
              size={this.props.iconSize || 20}
              color={colorPalette.grayText1}
            />
          </Animated.View>

        </View>

      );
    }
}
