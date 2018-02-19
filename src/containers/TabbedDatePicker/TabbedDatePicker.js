import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import TabbedDatePicker from '../../components/TabbedDatePicker';
import style from './styles';
import withTranslation from '../../components/Translation';
import { actions as tabbedDatePickerActions } from '../../reducers/tabbedDatePicker';

@withTranslation
@connect(
  state => ({
    timeStart: state.tabbedDatePicker.timeStart,
    timeEnd: state.tabbedDatePicker.timeEnd,
  }),
  tabbedDatePickerActions
)
export default class TabbedDatePickerContainer extends Component {
  render() {
    return (
      <View style={style.mainContainer}>
        <TabbedDatePicker {...this.props} />
      </View>
    );
  }
}
