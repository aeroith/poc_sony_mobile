import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions } from 'react-native';
import styles from './styles';
import foregroundStyles from './foregroundStyles';
import ParallaxScrollView from '../ParallaxScrollView';
import colorPalette from '../../config/colorPalette';
import Image from '../Image';
import withLoadingBar from '../../hocs/WithLoadingBar/WithLoadingBar';

const { width } = Dimensions.get('window');
const parallaxBackgroundHeight = 250;

@withLoadingBar
export default class ProgramContent extends Component {
    static propTypes = {
      translate: PropTypes.func.isRequired,
    };

    handleRenderBackground = () => {
      const { program } = this.props;
      return (
        <Image
          uri={program.details && program.details.global_image_url}
          height={parallaxBackgroundHeight}
          width={width}
          hasOverlay
        />
      );
    };

    handleRenderForeground = () => (
      <View style={foregroundStyles.container}>
        <View style={foregroundStyles.wrapper}>
          <Text style={foregroundStyles.headerText}>The Flash</Text>
        </View>
      </View>
    );

    render() {
      return (
        <ParallaxScrollView
          backgroundColor={colorPalette.grayBg5}
          contentBackgroundColor={colorPalette.grayBg4}
          parallaxHeaderHeight={parallaxBackgroundHeight}
          renderBackground={this.handleRenderBackground}
          renderForeground={this.handleRenderForeground}
        >
          <View style={{ height: 500 }}>
            <Text>Scroll me</Text>
          </View>
        </ParallaxScrollView>
      );
    }
}
