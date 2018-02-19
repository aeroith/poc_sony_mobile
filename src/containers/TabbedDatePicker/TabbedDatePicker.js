import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _times from 'lodash/times';
import TabbedDatePicker from '../../components/TabbedDatePicker';
import style from './styles';
import withTranslation from '../../components/Translation';
import { actions as tabbedDatePickerActions } from '../../reducers/tabbedDatePicker';

const moment = require('moment');

@withTranslation
@connect(
  state => ({
    timeStart: state.tabbedDatePicker.timeStart,
    timeEnd: state.tabbedDatePicker.timeEnd,
  }),
  tabbedDatePickerActions
)
export default class TabbedDatePickerContainer extends Component {
  static propTypes = {
    translate: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.data = _times(30, (num) => {
      if (num === 0) return { data: { dayOfWeek: this.props.translate('today') }, key: num.toString() };
      if (num === 1) return { data: { dayOfWeek: this.props.translate('tomorrow') }, key: num.toString() };
      const [dayOfWeek, dayNumber] = moment().add(num, 'days').format('ddd D').split(' ');
      return {
        data: {
          dayOfWeek,
          dayNumber,
        },
        key: num.toString(),
      };
    });
  }
  render() {
    return (
      <View style={style.mainContainer}>
        <TabbedDatePicker dates={this.data} {...this.props} />
      </View>
    );
  }
}
