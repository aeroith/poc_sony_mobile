import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions } from 'react-native';
import styles from './styles';
import { foregroundStyles, contentStyles } from './parallaxStyles';
import ParallaxScrollView from '../ParallaxScrollView';
import colorPalette from '../../config/colorPalette';
import Image from '../Image';
import withLoadingBar from '../../hocs/WithLoadingBar/WithLoadingBar';

const { width, height } = Dimensions.get('window');
const STICKY_HEADER_HEIGHT = 65;
const parallaxBackgroundHeight = 250;
const contentHeight = height - 250;

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
          <Text style={foregroundStyles.dateRange}>{ this.props.program.tmdbDetails.date_range }</Text>
        </View>
      </View>
    );

    handleRenderStickyHeader = () => {
      const { name } = this.props.program.details;
      return (
        <View style={styles.stickySection}>
          <Text style={styles.stickySectionText}>{ name }</Text>
        </View>
      );
    };

    handleOnHeaderChangeVisibility = (transparent) => {
      this.props.onChangeProgramPageHeader(transparent);
    };

    render() {
      return (
        <ParallaxScrollView
          onChangeHeaderVisibility={this.handleOnHeaderChangeVisibility}
          backgroundColor={colorPalette.grayBg4}
          contentBackgroundColor={colorPalette.grayBg4}
          parallaxHeaderHeight={parallaxBackgroundHeight}
          renderBackground={this.handleRenderBackground}
          renderForeground={this.handleRenderForeground}
          renderStickyHeader={this.handleRenderStickyHeader}
          stickyHeaderHeight={STICKY_HEADER_HEIGHT}
          outputScaleValue={7}
        >
          <View style={[contentStyles.wrapper, { height: contentHeight }]}>
            <Text>Scroll me</Text>
          </View>
        </ParallaxScrollView>
      );
    }
}
