import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Orientation from 'react-native-orientation';
import Carousel from '../../containers/Carousel/index';
import styles from './styles';
import TabbedDatePicker from '../../containers/TabbedDatePicker/index';
import Guide from '../../containers/Guide/index';
import withTranslation from '../../hocs/Translation/index';

@withTranslation
@connect(
  state => ({
    configLoading: state.app.configLoading
  }),
  null
)
export default class TVGuide extends Component {
  static propTypes = {
    configLoading: PropTypes.bool.isRequired,
  };
  componentDidMount() {
    Orientation.lockToPortrait();
  }

  componentWillUnmount() {
    Orientation.unlockAllOrientations();
  }
  render() {
    if (this.props.configLoading) return null;
    return (
      <View style={styles.container}>
        <Carousel />
        <TabbedDatePicker />
        <Guide />
      </View>
    );
  }
}
