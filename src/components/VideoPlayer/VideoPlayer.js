import React, { Component } from 'react';
import Video from 'react-native-video';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  PanResponder,
  Animated,
  Easing,
  Image,
  View,
  Text
} from 'react-native';
import { BlurView } from 'react-native-blur';
import Icon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import _padStart from 'lodash/padStart';
import Orientation from 'react-native-orientation';
import Spinner from '../Spinner';
import Utils from '../../utils/utils';
import styles from './styles';

export default class VideoPlayer extends Component {
  static defaultProps = {
    showOnStart: true,
    resizeMode: 'contain',
    playWhenInactive: false,
    playInBackground: false,
    title: '',
    repeat: false,
    paused: false,
    muted: false,
    volume: 1,
    rate: 1,
    disableBack: false,
    onError: this._onError,
    onEnd: this._onEnd,
    onLoadStart: undefined,
    onBack: this._onBack,
    onLoad: undefined,
    onProgress: undefined,
    controlTimeout: 15000,
    videoStyle: {},
    style: {},
    seekColor: '#FFF',
  };

  static propTypes = {
    resizeMode: PropTypes.string,
    title: PropTypes.string,
    seekColor: PropTypes.string,
    paused: PropTypes.bool,
    muted: PropTypes.bool,
    showOnStart: PropTypes.bool,
    playWhenInactive: PropTypes.bool,
    playInBackground: PropTypes.bool,
    disableBack: PropTypes.bool,
    repeat: PropTypes.bool,
    volume: PropTypes.number,
    rate: PropTypes.number,
    controlTimeout: PropTypes.number,
    onError: PropTypes.func,
    onEnd: PropTypes.func,
    onBack: PropTypes.func,
    onLoadStart: PropTypes.func,
    onLoad: PropTypes.func,
    onProgress: PropTypes.func,
    toggleTopBar: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
    source: PropTypes.object.isRequired,
    videoStyle: PropTypes.object,
    style: PropTypes.object,
    translate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    /**
     * All of our values that are updated by the
     * methods and listeners in this class
     */
    this.state = {
      // Video
      resizeMode: this.props.resizeMode,
      paused: this.props.paused,
      muted: this.props.muted,
      volume: this.props.volume,
      rate: this.props.rate,
      // Controls

      isFullscreen: this.props.resizeMode === 'cover' || false,
      showTimeRemaining: true,
      volumeTrackWidth: 0,
      lastScreenPress: 0,
      volumeFillWidth: 0,
      seekerFillWidth: 0,
      showControls: this.props.showOnStart,
      volumePosition: 0,
      seekerPosition: 0,
      volumeOffset: 0,
      seekerOffset: 0,
      seeking: false,
      loading: false,
      currentTime: 0,
      error: false,
      errorText: '',
      duration: 0,
      zIndex: 1,
      showRemainingTime: false,
    };

    /**
     * Any options that can be set at init.
     */
    this.opts = {
      playWhenInactive: this.props.playWhenInactive,
      playInBackground: this.props.playInBackground,
      repeat: this.props.repeat,
      title: this.props.title,
    };

    /**
     * Our app listeners and associated methods
     */
    this.events = {
      onError: this.props.onError,
      onEnd: this.props.onEnd,
      onScreenTouch: this._onScreenTouch.bind(this),
      onLoadStart: this._onLoadStart.bind(this),
      onProgress: this._onProgress.bind(this),
      onLoad: this._onLoad.bind(this),
    };

    /**
     * Functions used throughout the application
     */
    this.methods = {
      onBack: this.props.onBack,
      toggleFullscreen: this._toggleFullscreen.bind(this),
      togglePlayPause: this._togglePlayPause.bind(this),
      toggleControls: this._toggleControls.bind(this),
      toggleTimer: this._toggleTimer.bind(this),
    };

    /**
     * Player information
     */
    this.player = {
      controlTimeoutDelay: this.props.controlTimeout,
      volumePanResponder: PanResponder,
      seekPanResponder: PanResponder,
      controlTimeout: null,
      volumeWidth: 100,
      iconOffset: 7,
      seekWidth: 0,
      ref: Video,
    };

    /**
     * Various animations
     */
    const initialValue = this.props.showOnStart ? 1 : 0;

    this.animations = {
      bottomControl: {
        marginBottom: new Animated.Value(0),
        opacity: new Animated.Value(initialValue),
      },
      topControl: {
        marginTop: new Animated.Value(0),
        opacity: new Animated.Value(initialValue),
      },
      video: {
        opacity: new Animated.Value(1),
      },
      loader: {
        rotate: new Animated.Value(0),
        MAX_VALUE: 360,
      }
    };

    /**
     * Various styles that be added...
     */
    this.styles = {
      videoStyle: this.props.videoStyle,
      containerStyle: this.props.style,
    };
  }


  /**
   | -------------------------------------------------------
   | Events
   | -------------------------------------------------------
   |
   | These are the events that the <Video> component uses
   | and can be overridden by assigning it as a prop.
   | It is suggested that you override onEnd.
   |
   */

  /**
   * When load starts we display a loading icon
   * and show the controls.
   */
  _onLoadStart() {
    const { state } = this;
    state.loading = true;
    this.loadAnimation();
    this.setState(state);

    if (typeof this.props.onLoadStart === 'function') {
      this.props.onLoadStart(...arguments);
    }
  }

  /**
   * When load is finished we hide the load icon
   * and hide the controls. We also set the
   * video duration.
   *
   * @param {object} data The video meta data
   */
  _onLoad(data = {}) {
    const { state } = this;

    state.duration = data.duration;
    state.loading = false;
    this.setState(state);

    if (state.showControls) {
      this.setControlTimeout();
    }

    if (typeof this.props.onLoad === 'function') {
      this.props.onLoad(...arguments);
    }
  }

  /**
   * For onprogress we fire listeners that
   * update our seekbar and timer.
   *
   * @param {object} data The video meta data
   */
  _onProgress(data = {}) {
    const { state } = this;
    state.currentTime = data.currentTime;

    if (!state.seeking) {
      const position = this.calculateSeekerPosition();
      this.setSeekerPosition(position);
    }

    if (typeof this.props.onProgress === 'function') {
      this.props.onProgress(...arguments);
    }

    this.setState(state);
  }

  /**
   * It is suggested that you override this
   * command so your app knows what to do.
   * Either close the video or go to a
   * new page.
   */
  _onEnd = () => {}

  /**
   * Set the error state to true which then
   * changes our renderError function
   *
   * @param {object} err  Err obj returned from <Video> component
   */
  _onError = (err) => {
    const { state } = this;
    state.error = true;
    state.errorText = err.message || err;
    state.loading = false;

    this.setState(state);
  }

  /**
   * This is a single and double tap listener
   * when the user taps the screen anywhere.
   * One tap toggles controls, two toggles
   * fullscreen mode.
   */
  _onScreenTouch() {
    const { state } = this;
    const time = new Date().getTime();
    const delta = time - state.lastScreenPress;

    if (delta < 300) {
      this.methods.toggleFullscreen();
    }

    this.methods.toggleControls();
    state.lastScreenPress = time;

    this.setState(state);
  }


  /**
   | -------------------------------------------------------
   | Methods
   | -------------------------------------------------------
   |
   | These are all of our functions that interact with
   | various parts of the class. Anything from
   | calculating time remaining in a video
   | to handling control operations.
   |
   */

  /**
   * Set a timeout when the controls are shown
   * that hides them after a length of time.
   * Default is 15s
   */
  setControlTimeout() {
    this.player.controlTimeout = setTimeout(() => {
      this._hideControls();
    }, this.player.controlTimeoutDelay);
  }

  /**
   * Clear the hide controls timeout.
   */
  clearControlTimeout() {
    clearTimeout(this.player.controlTimeout);
  }

  /**
   * Reset the timer completely
   */
  resetControlTimeout() {
    this.clearControlTimeout();
    this.setControlTimeout();
  }

  /**
   * Animation to hide controls. We fade the
   * display to 0 then move them off the
   * screen so they're not interactable
   */
  hideControlAnimation() {
    Animated.parallel([
      Animated.timing(
        this.animations.topControl.opacity,
        { toValue: 0 }
      ),
      Animated.timing(
        this.animations.topControl.marginTop,
        { toValue: -100 }
      ),
      Animated.timing(
        this.animations.bottomControl.opacity,
        { toValue: 20 }
      ),
      Animated.timing(
        this.animations.bottomControl.marginBottom,
        { toValue: -100 }
      ),
    ]).start();
  }

  /**
   * Animation to show controls...opposite of
   * above...move onto the screen and then
   * fade in.
   */
  showControlAnimation() {
    Animated.parallel([
      Animated.timing(
        this.animations.topControl.opacity,
        { toValue: 1 }
      ),
      Animated.timing(
        this.animations.topControl.marginTop,
        { toValue: 0 }
      ),
      Animated.timing(
        this.animations.bottomControl.opacity,
        { toValue: 1 }
      ),
      Animated.timing(
        this.animations.bottomControl.marginBottom,
        { toValue: 0 }
      ),
    ]).start();
  }

  /**
   * Loop animation to spin loader icon. If not loading then stop loop.
   */
  loadAnimation() {
    if (this.state.loading) {
      Animated.sequence([
        Animated.timing(
          this.animations.loader.rotate,
          {
            toValue: this.animations.loader.MAX_VALUE,
            duration: 1500,
            easing: Easing.linear,
          }
        ),
        Animated.timing(
          this.animations.loader.rotate,
          {
            toValue: 0,
            duration: 0,
            easing: Easing.linear,
          }
        ),
      ]).start(this.loadAnimation.bind(this));
    }
  }

  /**
   * Function to hide the controls. Sets our
   * state then calls the animation.
   */
  _hideControls() {
    const { state } = this;
    state.showControls = false;
    this.hideControlAnimation();

    this.setState(state);
  }

  /**
   * Function to toggle controls based on
   * current state.
   */
  _toggleControls() {
    const { state } = this;
    state.showControls = !state.showControls;

    if (state.showControls) {
      this.showControlAnimation();
      this.setControlTimeout();
    } else {
      this.hideControlAnimation();
      this.clearControlTimeout();
    }

    this.setState(state);
  }

  /**
   * Toggle fullscreen changes resizeMode on
   * the <Video> component then updates the
   * isFullscreen state.
   */
  _toggleFullscreen() {
    const { state } = this;
    state.isFullscreen = !state.isFullscreen;
    const toFullScreen = state.isFullscreen;
    state.resizeMode = state.isFullscreen === true ? 'cover' : 'contain';
    this.props.toggleTopBar();
    this.setState(state, () => {
      if (toFullScreen) {
        Orientation.lockToLandscape();
      } else {
        Orientation.unlockAllOrientations();
      }
    });
  }

  /**
   * Toggle playing state on <Video> component
   */
  _togglePlayPause() {
    const { state } = this;
    state.paused = !state.paused;
    this.setState(state);
  }

  /**
   * Toggle between showing time remaining or
   * video duration in the timer control
   */
  _toggleTimer() {
    const { state } = this;
    state.showTimeRemaining = !state.showTimeRemaining;
    this.setState(state);
  }

  /**
   * The default 'onBack' function pops the navigator
   * and as such the video player requires a
   * navigator prop by default.
   */
  _onBack = () => {
    if (this.props.navigator && this.props.navigator.pop) {
      this.props.navigator.pop();
    } else {
      console.warn('Warning: _onBack requires navigator property to function. Either modify the onBack prop or pass a navigator prop');
    }
  };

  /**
   * Calculate the time to show in the timer area
   * based on if they want to see time remaining
   * or duration. Formatted to look as 00:00.
   */
  calculateTime() {
    if (this.state.showTimeRemaining) {
      const time = this.state.duration - this.state.currentTime;
      return `-${this.formatTime(time)}`;
    }

    return this.formatTime(this.state.currentTime);
  }

  /**
   * Format a time string as mm:ss
   *
   * @param {int} time time in milliseconds
   * @return {string} formatted time string in mm:ss format
   */
  formatTime(time = 0) {
    const symbol = this.state.showRemainingTime ? '-' : '';
    time = Math.min(
      Math.max(time, 0),
      this.state.duration
    );

    const formattedMinutes = _padStart(Math.floor(time / 60).toFixed(0), 2, 0);
    const formattedSeconds = _padStart(Math.floor(time % 60).toFixed(0), 2, 0);

    return `${symbol}${formattedMinutes}:${formattedSeconds}`;
  }

  /**
   * Set the position of the seekbar's components
   * (both fill and handle) according to the
   * position supplied.
   *
   * @param {float} position position in px of seeker handle}
   */
  setSeekerPosition(position = 0) {
    const { state } = this;
    position = this.constrainToSeekerMinMax(position);

    state.seekerFillWidth = position;
    state.seekerPosition = position;

    if (!state.seeking) {
      state.seekerOffset = position;
    }

    this.setState(state);
  }

  /**
   * Contrain the location of the seeker to the
   * min/max value based on how big the
   * seeker is.
   *
   * @param {float} val position of seeker handle in px
   * @return {float} contrained position of seeker handle in px
   */
  constrainToSeekerMinMax(val = 0) {
    if (val <= 0) {
      return 0;
    } else if (val >= this.player.seekerWidth) {
      return this.player.seekerWidth;
    }
    return val;
  }

  /**
   * Calculate the position that the seeker should be
   * at along its track.
   *
   * @return {float} position of seeker handle in px based on currentTime
   */
  calculateSeekerPosition() {
    const percent = this.state.currentTime / this.state.duration;
    return this.player.seekerWidth * percent;
  }

  /**
   * Return the time that the video should be at
   * based on where the seeker handle is.
   *
   * @return {float} time in ms based on seekerPosition.
   */
  calculateTimeFromSeekerPosition() {
    const percent = this.state.seekerPosition / this.player.seekerWidth;
    return this.state.duration * percent;
  }

  /**
   * Seek to a time in the video.
   *
   * @param {float} time time to seek to in ms
   */
  seekTo(time = 0) {
    const { state } = this;
    state.currentTime = time;
    this.player.ref.seek(time);
    this.setState(state);
  }

  /**
   * Set the position of the volume slider
   *
   * @param {float} position position of the volume handle in px
   */
  setVolumePosition(position = 0) {
    const { state } = this;
    position = this.constrainToVolumeMinMax(position);
    state.volumePosition = position + this.player.iconOffset;
    state.volumeFillWidth = position;

    state.volumeTrackWidth = this.player.volumeWidth - state.volumeFillWidth;

    if (state.volumeFillWidth < 0) {
      state.volumeFillWidth = 0;
    }
    const maxVolumeTrackWidth = this.state.isFullscreen ? 160 : 100;
    if (state.volumeTrackWidth > maxVolumeTrackWidth) {
      state.volumeTrackWidth = maxVolumeTrackWidth;
    }

    this.setState(state);
  }

  /**
   * Constrain the volume bar to the min/max of
   * its track's width.
   *
   * @param {float} val position of the volume handle in px
   * @return {float} contrained position of the volume handle in px
   */
  constrainToVolumeMinMax(val = 0) {
    if (val <= 0) {
      return 0;
    } else if (val >= this.player.volumeWidth + 9) {
      return this.player.volumeWidth + 9;
    }
    return val;
  }

  /**
   * Get the volume based on the position of the
   * volume object.
   *
   * @return {float} volume level based on volume handle position
   */
  calculateVolumeFromVolumePosition() {
    return this.state.volumePosition / this.player.volumeWidth;
  }

  /**
   * Get the position of the volume handle based
   * on the volume
   *
   * @return {float} volume handle position in px based on volume
   */
  calculateVolumePositionFromVolume() {
    return this.player.volumeWidth / this.state.volume;
  }


  /**
   | -------------------------------------------------------
   | React Component functions
   | -------------------------------------------------------
   |
   | Here we're initializing our listeners and getting
   | the component ready using the built-in React
   | Component methods
   |
   */

  /**
   * Before mounting, init our seekbar and volume bar
   * pan responders.
   */
  componentWillMount() {
    this.initSeekPanResponder();
    this.initVolumePanResponder();
  }


  /**
   * Upon mounting, calculate the position of the volume
   * bar based on the volume property supplied to it.
   */
  componentDidMount() {
    const position = this.calculateVolumePositionFromVolume();
    const { state } = this;
    this.setVolumePosition(position);
    state.volumeOffset = position;

    this.setState(state);
  }

  /**
   * To allow basic playback management from the outside
   * we have to handle possible props changes to state changes
   */
  componentWillReceiveProps(nextProps) {
    if (this.state.paused !== nextProps.paused) {
      this.setState({
        paused: nextProps.paused
      });
    }
  }

  /**
   * When the component is about to unmount kill the
   * timeout less it fire in the prev/next scene
   */
  componentWillUnmount() {
    this.clearControlTimeout();
  }

  /**
   * Get our seekbar responder going
   */
  initSeekPanResponder() {
    this.player.seekPanResponder = PanResponder.create({

      // Ask to be the responder.
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      /**
       * When we start the pan tell the machine that we're
       * seeking. This stops it from updating the seekbar
       * position in the onProgress listener.
       */
      onPanResponderGrant: (evt, gestureState) => {
        const { state } = this;
        this.clearControlTimeout();
        state.seeking = true;
        this.setState(state);
      },

      /**
       * When panning, update the seekbar position, duh.
       */
      onPanResponderMove: (evt, gestureState) => {
        const position = this.state.seekerOffset + gestureState.dx;
        this.setSeekerPosition(position);
      },

      /**
       * On release we update the time and seek to it in the video.
       * If you seek to the end of the video we fire the
       * onEnd callback
       */
      onPanResponderRelease: (evt, gestureState) => {
        const time = this.calculateTimeFromSeekerPosition();
        const { state } = this;
        if (time >= state.duration && !state.loading) {
          state.paused = true;
          this.events.onEnd();
        } else {
          this.seekTo(time);
          this.setControlTimeout();
          state.seeking = false;
        }
        this.setState(state);
      }
    });
  }

  /**
   * Initialize the volume pan responder.
   */
  initVolumePanResponder() {
    this.player.volumePanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.clearControlTimeout();
      },

      /**
       * Update the volume as we change the position.
       * If we go to 0 then turn on the mute prop
       * to avoid that weird static-y sound.
       */
      onPanResponderMove: (evt, gestureState) => {
        const { state } = this;
        const position = this.state.volumeOffset + gestureState.dx;

        this.setVolumePosition(position);
        state.volume = this.calculateVolumeFromVolumePosition();

        state.muted = state.volume <= 0;

        this.setState(state);
      },

      /**
       * Update the offset...
       */
      onPanResponderRelease: (evt, gestureState) => {
        const { state } = this;
        state.volumeOffset = state.volumePosition;
        this.setControlTimeout();
        this.setState(state);
      }
    });
  }


  /**
   | -------------------------------------------------------
   | Rendering
   | -------------------------------------------------------
   |
   | This section contains all of our render methods.
   | In addition to the typical React render func
   | we also have all the render methods for
   | the controls.
   |
   */

  /**
   * Standard render control function that handles
   * everything except the sliders. Adds a
   * consistent <TouchableHighlight>
   * wrapper and styling.
   */
  renderControl(children, callback = () => {}, style = {}) {
    return (
      <TouchableHighlight
        underlayColor="transparent"
        activeOpacity={0.3}
        onPress={() => {
          this.resetControlTimeout();
          callback();
        }}
        style={style}
      >
        { children }
      </TouchableHighlight>
    );
  }

  /**
   * Renders an empty control, used to disable a control without breaking the view layout.
   */
  renderNullControl() {
    return (
      <View style={[styles.controls.control]} />
    );
  }

  /**
   * Groups the top bar controls together in an animated
   * view and spaces them out.
   */
  renderTopControls() {
    const backControl = !this.props.disableBack ? this.renderBack() : this.renderNullControl();

    return (
      <Animated.View style={[
        styles.controls.top,
        {
          opacity: this.animations.topControl.opacity,
          marginTop: this.animations.topControl.marginTop,
        }
      ]}
      >
        <View
          style={[styles.controls.column]}
        >
          <View style={styles.controls.topControlGroup}>
            { backControl }
          </View>
        </View>
      </Animated.View>
    );
  }

  /**
   * Back button control
   */
  renderBack() {
    const backIcon = Utils.renderIconForPlatform(
      <Icon name="ios-arrow-back" size={36} style={styles.controls.back} />,
      <Icon name="md-arrow-back" size={36} style={styles.controls.back} />
    );
    return this.renderControl(
      backIcon,
      this.methods.onBack,
    );
  }

  /**
   * Render the volume slider and attach the pan handlers
   */
  renderVolume() {
    return (
      <View style={styles.volume.container}>
        <Icon name="ios-volume-up" size={26} style={styles.volume.icon} />
        <View style={[
          styles.volume.fill,
          { width: this.state.volumeFillWidth }
        ]}
        />
        <View style={[
          styles.volume.track,
          { width: this.state.volumeTrackWidth }
        ]}
        />
        <View
          style={[
            styles.volume.handle,
            { left: this.state.volumePosition }
          ]}
          {...this.player.volumePanResponder.panHandlers}
        >
          <View style={styles.volume.hiddenHandle} />
        </View>
      </View>
    );
  }

  /**
   * Render fullscreen toggle and set icon based on the fullscreen state.
   */
  renderFullscreen() {
    const source = this.state.isFullscreen === true ?
      <EntypoIcon name="resize-100-" size={26} style={styles.controls.fullScrenIcon} /> :
      <EntypoIcon name="resize-full-screen" size={26} style={styles.controls.fullScrenIcon} />;
    return this.renderControl(
      source,
      this.methods.toggleFullscreen,
      styles.controls.fullscreen
    );
  }

  renderBlurControls() {
    const playPauseIcon = this.state.paused ?
      Utils.renderIconForPlatform(
        <Icon name="ios-play" size={32} style={[styles.blurView.icon, styles.blurView.middleIcon]} />,
        <Icon name="md-play" size={32} style={[styles.blurView.icon, styles.blurView.middleIcon]} />
      ) :
      Utils.renderIconForPlatform(
        <Icon name="ios-pause" size={32} style={[styles.blurView.icon, styles.blurView.middleIcon]} />,
        <Icon name="md-pause" size={32} style={[styles.blurView.icon, styles.blurView.middleIcon]} />
      );
    return (
      <Animated.View style={[
        styles.blurView.container,
        {
          opacity: this.animations.bottomControl.opacity,
          marginBottom: this.animations.bottomControl.marginBottom,
        }
      ]}
      >
        <BlurView style={styles.blurView.blur} blur={10}>
          { this.renderSeekbar() }
          <View style={styles.blurView.controls}>
            {
              this.renderControl(
                this.renderFullscreen(),
                this.methods.toggleFullscreen,
                { marginBottom: 15 }
              )
            }
            <View style={styles.blurView.mediaControls}>
              {
                this.renderControl(
                  playPauseIcon,
                  this.methods.togglePlayPause
                )
              }
            </View>
            { this.renderVolume() }
          </View>
        </BlurView>
      </Animated.View>
    );
  }

  /**
   * Render the seekbar and attach its handlers
   */
  renderSeekbar() {
    return (
      <View style={styles.seekbar.container}>
        <View
          style={styles.seekbar.track}
          onLayout={event => this.player.seekerWidth = event.nativeEvent.layout.width}
        >
          <View style={[
            styles.seekbar.fill,
            {
              width: this.state.seekerFillWidth,
              backgroundColor: this.props.seekColor || '#FFF'
            }
          ]}
          />
        </View>
        <View
          style={[
            styles.seekbar.handle,
            { left: this.state.seekerPosition }
          ]}
          {...this.player.seekPanResponder.panHandlers}
        >
          <View style={[
            styles.seekbar.circle,
            { backgroundColor: this.props.seekColor || '#FFF' }]}
          />
        </View>
      </View>
    );
  }

  /**
   * Render our title...if supplied.
   * TODO: Make it work. Currently it is unusable
   */
  renderTitle() {
    if (this.opts.title) {
      return (
        <View style={[
          styles.controls.control,
          styles.controls.title,
        ]}
        >
          <Text
            style={[
            styles.controls.text,
            styles.controls.titleText
          ]}
            numberOfLines={1}
          >
            { this.opts.title || '' }
          </Text>
        </View>
      );
    }

    return null;
  }

  /**
   * Show our timer.
   * TODO: Make it work. Currently it is unusable
   */
  renderTimer() {
    return this.renderControl(
      <Text style={styles.controls.timerText}>
        { this.calculateTime() }
      </Text>,
      this.methods.toggleTimer,
      styles.controls.timer
    );
  }

  /**
   * Show loading icon
   */
  renderLoader() {
    if (this.state.loading) {
      return (
        <Spinner wrapperStyle={styles.loader.container} />
      );
    }
    return null;
  }

  renderError() {
    if (this.state.error) {
      return (
        <View style={styles.error.container}>
          <Icon name="ios-close-circle-outline" style={styles.error.icon} />
          <Text style={styles.error.text}>
            {this.props.translate('video_unavailable')}
          </Text>
        </View>
      );
    }
    return null;
  }

  /**
   * Provide all of our options and render the whole component.
   */
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.events.onScreenTouch}
        style={[styles.player.container, this.styles.containerStyle, { zIndex: this.state.zIndex }]}
      >
        <View style={[styles.player.container, this.styles.containerStyle]}>
          <Video
            {...this.props}
            ref={videoPlayer => this.player.ref = videoPlayer}

            resizeMode={this.state.resizeMode}
            volume={this.state.volume}
            paused={this.state.paused}
            muted={this.state.muted}
            rate={this.state.rate}

            onLoadStart={this.events.onLoadStart}
            onProgress={this.events.onProgress}
            onError={this.events.onError}
            onLoad={this.events.onLoad}
            onEnd={this.events.onEnd}

            style={[styles.player.video, this.styles.videoStyle]}

            source={this.props.source}
          />
          { this.renderError() }
          { this.renderTopControls() }
          { this.renderLoader() }
          { this.renderBlurControls() }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
