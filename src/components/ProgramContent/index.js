import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import styles, { stickyHeaderStyle } from './styles';
import { foregroundStyles, contentStyles } from './parallaxStyles';
import ParallaxScrollView from '../ParallaxScrollView';
import colorPalette from '../../config/colorPalette';
import Image from '../Image';
import withLoadingBar from '../../hocs/WithLoadingBar/WithLoadingBar';

const { width, height } = Dimensions.get('window');
const { height: stickyHeaderHeight } = stickyHeaderStyle;
const parallaxBackgroundHeight = 250;
const contentHeight = height - 250;

@withLoadingBar
export default class ProgramContent extends Component {
    static propTypes = {
      translate: PropTypes.func.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        season: 1,
      };
    }

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

    handleRenderForeground = () => {
      const { name } = this.props.program.details;
      return (
        <View style={foregroundStyles.container}>
          <View style={foregroundStyles.wrapper}>
            <Text style={foregroundStyles.headerText}>{ name }</Text>
            <Text style={foregroundStyles.dateRange}>{ this.props.program.tmdbDetails.date_range }</Text>
          </View>
          <TouchableOpacity style={styles.socialIconButton} activeOpacity={0.8}>
            <SimpleLineIcon style={styles.socialIcon} name="share" size={17} color={colorPalette.white} />
          </TouchableOpacity>
        </View>
      );
    };

    handleRenderStickyHeader = () => {
      const { name } = this.props.program.details;
      return (
        <View style={styles.stickySection}>
          <View style={styles.stickySectionWrapper}>
            <Text style={styles.stickySectionText}>{ name }</Text>
          </View>
        </View>
      );
    };

    handleOnHeaderChangeVisibility = (transparent) => {
      this.props.onChangeProgramPageHeader(transparent);
    };

    handleSeasonSelect = () => {
      console.log('seasonSelect clicked');
    };

    render() {
      const seasonInfo = `${this.props.translate('season')} ${this.state.season}`;
      const { description } = this.props.program.details;
      return (
        <ParallaxScrollView
          onChangeHeaderVisibility={this.handleOnHeaderChangeVisibility}
          backgroundColor={colorPalette.grayBg4}
          contentBackgroundColor={colorPalette.grayBg4}
          parallaxHeaderHeight={parallaxBackgroundHeight}
          renderBackground={this.handleRenderBackground}
          renderForeground={this.handleRenderForeground}
          renderStickyHeader={this.handleRenderStickyHeader}
          stickyHeaderHeight={stickyHeaderHeight}
          outputScaleValue={7}
        >
          <View style={[styles.content, { height: contentHeight }]}>
            <View style={styles.contentWrapper}>
              <View style={styles.contentSection}>
                <Text style={styles.contentHeaderText}>Description</Text>
                <Text style={styles.contentText}>{ description }</Text>
              </View>
              <TouchableOpacity
                onPress={this.handleSeasonSelect}
                style={styles.seasonButton}
                activeOpacity={0.8}
              >
                <Text style={styles.seasonButtonText}>{ seasonInfo }</Text>
                <Icon style={styles.seasonButtonIcon} name="ios-arrow-down" size={19} color={colorPalette.red} />
              </TouchableOpacity>
            </View>
          </View>
        </ParallaxScrollView>
      );
    }
}
