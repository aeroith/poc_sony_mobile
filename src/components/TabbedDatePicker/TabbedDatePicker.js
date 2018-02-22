import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const moment = require('moment');

export default class TabbedDatePicker extends Component {
  static propTypes = {
    dates: PropTypes.array.isRequired,
    setTime: PropTypes.func.isRequired,
    setTvGuideResults: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onTabItemClick = this.onTabItemClick.bind(this);
    this.state = {
      selected: 0,
    };
  }
  onTabItemClick(index) {
    return () => {
      const momentNow = index === 0 ? moment() : moment().add(index, 'days').startOf('day');
      const timeStart = momentNow.unix(Number);
      const timeEnd = momentNow.endOf('day').unix(Number);
      this.setState({ selected: index });
      this.props.setTime(timeStart, timeEnd);
      this.props.setTvGuideResults(timeStart, timeEnd);
    };
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {
            this.props.dates.map((date, index) => (
              <TabItem
                key={date.key}
                active={this.state.selected === index}
                text={date.data.dayOfWeek}
                dayNumber={date.data.dayNumber}
                onPress={this.onTabItemClick(index)}
              />
            ))
          }
        </ScrollView>
      </View>
    );
  }
};

const TabItem = ({ text, dayNumber, active, onPress, ...props }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.tabItem, active && styles.tabItemActive]}
    {...props}
  >
    <View>
      <View style={styles.textContainer}>
        <Text style={[styles.tabItemText, active && styles.tabItemTextActive]}>{text}</Text>
        {dayNumber &&
          <Text style={[styles.textDayNumber, active && styles.textDayNumberActive]}>
            {dayNumber}
          </Text>}
      </View>
      {active && <View style={[styles.triangle]} />}
    </View>
  </TouchableOpacity>
);

TabItem.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onPress: PropTypes.func,
  dayNumber: PropTypes.string,
};

TabItem.defaultProps = {
  active: false,
  onPress: () => {},
  dayNumber: undefined
};
