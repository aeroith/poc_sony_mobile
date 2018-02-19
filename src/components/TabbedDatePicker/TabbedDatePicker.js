import React, { Component } from 'react';
import { View, SectionList, Text} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
const moment = require('moment');

export default class TabbedDatePicker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <TabItem active text={'Today'}/>
        <TabItem text={'Tomorrow'}/>
        <TabItem text={'Wed 09'}/>
        <TabItem text={'Thu 10'}/>
      </View>
    );
  }
};

const TabItem = ({text, active, onClick, ...props}) => (
  <View style={[styles.tabItem, active && styles.tabItemActive]} {...props}>
    <Text style={[styles.tabItemText, active && styles.tabItemTextActive]}>{text}</Text>
    <View style={active && [styles.triangle]} />
  </View>
);

TabItem.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

TabItem.defaultProps = {
  active: false,
};
