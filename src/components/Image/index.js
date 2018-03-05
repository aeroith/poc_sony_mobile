import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Image as AnimatableImage } from 'react-native-animatable';
import config from '../../config/config';
import Spinner from '../Spinner';
import styles from './styles';

class ImageWrapper extends Component {
  static propTypes = {
    uri: PropTypes.string,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    style: PropTypes.any,
    wrapperStyle: PropTypes.any,
  };

  static defaultProps = {
    wrapperStyle: {},
    style: {},
    uri: config.dummyImageUrl,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  handleOnLoad = () => {
    this.setState({ loading: false });
  };

  calculateStyles = () => {
    const { height, width } = this.props;
    // Converting to StyleSheet.create causes bugs should be calculated while rendering
    return {
      imageStyles: { height, width },
      spinnerStyles: { top: height * 0.5, left: width * 0.5 }
    };
  };

  renderSpinner = spinnerStyles => <View style={[styles.spinner, spinnerStyles]}><Spinner /></View>;

  render() {
    const { imageStyles, spinnerStyles } = this.calculateStyles();
    const isLoading = this.state.loading || !this.props.uri;
    return (
      <View style={[this.props.style, imageStyles]}>
        {isLoading && this.renderSpinner(spinnerStyles)}
        <AnimatableImage
          animation="fadeIn"
          easing="ease-in"
          duration={300}
          source={{ uri: this.props.uri || config.dummyImageUrl }}
          style={[styles.image, isLoading && styles.imageLoading, imageStyles]}
          onLoad={this.handleOnLoad}
        />
      </View>

    );
  }
}

export default ImageWrapper;
