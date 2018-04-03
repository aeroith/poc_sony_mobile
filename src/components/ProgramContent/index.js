import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { View as AnimatableView } from 'react-native-animatable';
import styles, { stickyHeaderStyle, episodeItemDimensions } from './styles';
import foregroundStyles from './parallaxStyles';
import Share from '../Share';
import ParallaxScrollView from '../ParallaxScrollView';
import colorPalette from '../../config/colorPalette';
import Image from '../Image';
import withLoadingBar from '../../hocs/WithLoadingBar/WithLoadingBar';

const { width } = Dimensions.get('window');
const { height: stickyHeaderHeight } = stickyHeaderStyle;

@withLoadingBar
export default class ProgramContent extends Component {
    static propTypes = {
      translate: PropTypes.func.isRequired,
      program: PropTypes.objectOf(PropTypes.any).isRequired,
      onChangeProgramPageHeader: PropTypes.func.isRequired,
    };

    constructor(props) {
      super(props);
      this.seasonKeysArr = Object.keys(this.props.program.details.titles).sort();
      this.state = {
        season: this.seasonKeysArr[0],
      };
    }

    handleRenderBackground = () => {
      const { program } = this.props;
      return (
        <Image
          uri={program.details && program.details.global_image_url}
          height={foregroundStyles.parallaxBackgroundHeight}
          width={width}
          hasOverlay
        />
      );
    };

    handleRenderForeground = () => {
      const { name } = this.props.program.details;
      return (
        <AnimatableView animation="fadeInDown" style={foregroundStyles.container}>
          <View style={foregroundStyles.wrapper}>
            <Text style={foregroundStyles.headerText}>{name}</Text>
            <Text style={foregroundStyles.dateRange}>
              {this.props.program.tmdbDetails.date_range}
            </Text>
          </View>
          <Share
            message={`${name} is awesome!`}
            callback={this.handleOnSocialIconClick}
            style={styles.socialIconButton}
          />
        </AnimatableView>
      );
    };

    handleRenderStickyHeader = () => {
      const { name } = this.props.program.details;
      return (
        <View style={styles.stickySection}>
          <View style={styles.stickySectionWrapper}>
            <View style={styles.stickySectionLeftContent} />
            <Text style={styles.stickySectionMidContent}>{ name }</Text>
            <View style={styles.stickySectionRightContent}>
              <Share
                message={`${name} is awesome!`}
                callback={this.handleOnSocialIconClick}
                style={styles.stickySocialButton}
              />
            </View>
          </View>
        </View>
      );
    };

    handleOnHeaderChangeVisibility = (transparent) => {
      this.props.onChangeProgramPageHeader(transparent);
    };

    handleSeasonSelect = () => {
      console.log('Season select clicked');
    };

    handleOnSocialIconClick = (e) => {
      console.log(`'Social icon clicked with action: ${e.action}`);
    };

    render() {
      const seasonInfo = `${this.props.translate('season')} ${this.state.season}`;
      const { description } = this.props.program.details;
      return (
        <ParallaxScrollView
          onChangeHeaderVisibility={this.handleOnHeaderChangeVisibility}
          backgroundColor={colorPalette.grayBg4}
          contentBackgroundColor={colorPalette.grayBg4}
          parallaxHeaderHeight={foregroundStyles.parallaxBackgroundHeight}
          renderBackground={this.handleRenderBackground}
          renderForeground={this.handleRenderForeground}
          renderStickyHeader={this.handleRenderStickyHeader}
          stickyHeaderHeight={stickyHeaderHeight}
          outputScaleValue={7}
        >
          <View
            style={styles.content}
          >
            <View style={styles.contentWrapper}>
              {/* Description */}
              <View style={styles.contentSection}>
                <Text style={styles.contentHeaderText}>{this.props.translate('description')}</Text>
                <Text style={styles.contentText}>{ description }</Text>
              </View>

              <View style={styles.contentSection}>
                {/* Season selection */}
                {this.props.program.details.type !== 'movie' && (
                  <TouchableOpacity
                    onPress={this.handleSeasonSelect}
                    style={styles.seasonButton}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.seasonButtonText}>{ seasonInfo }</Text>
                    <Icon style={styles.seasonButtonIcon} name="ios-arrow-down" size={19} color={colorPalette.red} />
                  </TouchableOpacity>
                )}
                {/* Episodes */}
                <View style={styles.episodes}>
                  {this.props.program.details
                    && Object.keys(this.props.program.details.titles).length > 0
                    && (
                    this.props.program.details.titles[this.state.season].map((episode, index) => (
                      <AnimatableView animation="fadeInUp" style={styles.episode} key={`${episode.id}_${index}`}>
                        <View style={styles.episodeNumber}>
                          <Text style={styles.episodeNumberText}>{episode.episode_number}</Text>
                        </View>
                        <View style={styles.episodeImage}>
                          <Image
                            uri={episode.episode_image_url || episode.local_image_url}
                            height={episodeItemDimensions.height}
                            width={episodeItemDimensions.imageWidth}
                          />
                        </View>
                        <View style={styles.episodeDescription}>
                          <Text style={styles.episodeName}>{episode.episode_name}</Text>
                        </View>
                      </AnimatableView>
                    ))
                  )}
                </View>
              </View>
            </View>
          </View>
        </ParallaxScrollView>
      );
    }
}
