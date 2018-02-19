import React, { Component } from 'react';
import { View } from 'react-native';
import TabbedDatePicker from '../../components/TabbedDatePicker';
import style from './styles';
import { connect } from "react-redux";
import withTranslation from '../../components/Translation';

const moment = require('moment');

@withTranslation
export default class TabbedDatePickerContainer extends Component {

  render() {
    return (
      <View style={style.mainContainer}>
        <TabbedDatePicker />
      </View>
    );
  }
}