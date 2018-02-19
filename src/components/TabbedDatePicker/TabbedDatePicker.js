import React, { Component } from 'react';
import { View, SectionList, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const moment = require('moment');

export default class TabbedDatePicker extends Component {
  constructor(props) {
    super(props);
    this.onTabItemClick = this.onTabItemClick.bind(this);
    this.state = {
      selected: 0,
    };
  }
  onTabItemClick(index) {
    const self = this;
    return () => {
      console.log(self.props)
      const momentNow = moment().add(index, 'days');
      const timeStart = momentNow.unix(Number);
      const timeEnd = momentNow.endOf('day').unix(Number);
      this.setState({ selected: index });
      self.props.setTime(timeStart, timeEnd);
    };
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <TabItem onClick={this.onTabItemClick(0)} active text={'Today'}/>
        <TabItem onClick={this.onTabItemClick(1)} text={'Tomorrow'}/>
        <TabItem onClick={this.onTabItemClick(2)} text={'Wed 09'}/>
        <TabItem onClick={this.onTabItemClick(3)} text={'Thu 10'}/>
      </View>
    );
  }
};

const TabItem = ({ text, active, onClick, ...props }) => (
  <TouchableOpacity onPress={onClick} style={[styles.tabItem, active && styles.tabItemActive]} {...props}>
    <View >
      <Text style={[styles.tabItemText, active && styles.tabItemTextActive]}>{text}</Text>
      <View style={active && [styles.triangle]} />
    </View>
  </TouchableOpacity>
);

TabItem.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

TabItem.defaultProps = {
  active: false,
  onClick: () => {},
};
