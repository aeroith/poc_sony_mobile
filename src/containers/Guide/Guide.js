import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Guide from '../../components/Guide';
import styles from './styles';
import { actions as guideActions } from '../../reducers/guide';
import Spinner from '../../components/Spinner';

@connect(
  state => ({
    guide: state.guide.guide,
    timeStart: state.tabbedDatePicker.timeStart,
    timeEnd: state.tabbedDatePicker.timeEnd,
    isLoading: state.guide.isLoading,
  }),
  guideActions
)
export default class GuideContainer extends Component {
  static propTypes = {
    setTvGuideResults: PropTypes.func.isRequired,
    timeStart: PropTypes.number.isRequired,
    timeEnd: PropTypes.number.isRequired,
    isLoading: PropTypes.bool,
  };

  componentDidMount() {
    const { timeStart, timeEnd } = this.props;
    this.props.setTvGuideResults(timeStart, timeEnd);
  }

  render() {
    // TODO: Move this logic to higher-order-component
    if (this.props.isLoading) {
      return (
        <View style={styles.searchBarContainer}>
          <Spinner iconStyle={styles.searchBarIconStyle} iconSize={40} />
        </View>
      );
    }
    return (
      <View style={styles.mainContainer}>
        <Guide {...this.props} />
      </View>
    );
  }
}

GuideContainer.defaultProps = {
  isLoading: false,
};
