import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Guide from '../../components/Guide';
import styles from './styles';
import { actions as guideActions } from '../../reducers/guide';

@connect(
  state => ({
    guide: state.guide.guide,
    timeStart: state.tabbedDatePicker.timeStart,
    timeEnd: state.tabbedDatePicker.timeEnd,
  }),
  guideActions
)
export default class GuideContainer extends Component {
  static propTypes = {
    setTvGuideResults: PropTypes.func.isRequired,
    timeStart: PropTypes.number.isRequired,
    timeEnd: PropTypes.number.isRequired,
  };

  componentDidMount() {
    const { timeStart, timeEnd } = this.props;
    this.props.setTvGuideResults(timeStart, timeEnd);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Guide {...this.props} />
      </View>
    );
  }
}