import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _times from 'lodash/times';
import TabbedDatePicker from '../../components/TabbedDatePicker';
import style from './styles';
import withTranslation from '../../hocs/Translation';
import { actions as tabbedDatePickerActions } from '../../reducers/tabbedDatePicker';
import { setTvGuideResults } from '../../reducers/guide';

const moment = require('moment');

@withTranslation
@connect(
  state => ({
    timeStart: state.tabbedDatePicker.timeStart,
    timeEnd: state.tabbedDatePicker.timeEnd,
    channelId: state.app.channelId,
  }),
  {
    ...tabbedDatePickerActions,
    setTvGuideResults,
  }
)
export default class TabbedDatePickerContainer extends Component {
  static propTypes = {
    translate: PropTypes.func.isRequired
  };
  getDayOfWeek = (translateFn, momentDayOfWeek) => translateFn(`days.${momentDayOfWeek.toLowerCase()}`).substring(0, 3);
  generateData = () => _times(30, (num) => {
    if (num === 0) return { data: { dayOfWeek: this.props.translate('today') }, key: num.toString() };
    if (num === 1) return { data: { dayOfWeek: this.props.translate('tomorrow') }, key: num.toString() };
    const [dayOfWeek, dayNumber] = moment().add(num, 'days').format('ddd D').split(' ');
    return {
      data: {
        dayOfWeek: this.getDayOfWeek(this.props.translate, dayOfWeek),
        dayNumber,
      },
      key: num.toString(),
    };
  });
  render() {
    return (
      <View style={style.mainContainer}>
        <TabbedDatePicker dates={this.generateData()} {...this.props} />
      </View>
    );
  }
}
