import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const moment = require('moment');

export default class TabbedDatePicker extends Component {
  static propTypes = {
    dates: PropTypes.array.isRequired,
  }
  constructor(props) {
    super(props);
    this.onTabItemClick = this.onTabItemClick.bind(this);
    console.log(this.props.dates)
    this.state = {
      selected: 0,
    };
  }
  onTabItemClick(index) {
    const self = this;
    return () => {
      const momentNow = moment().add(index, 'days');
      const timeStart = momentNow.unix(Number);
      const timeEnd = momentNow.endOf('day').unix(Number);
      this.setState({ selected: index });
      self.props.setTime(timeStart, timeEnd);
    };
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView
          horizontal
          pagingEnabled
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
        {dayNumber && <Text style={styles.textDayNumber}>{dayNumber}</Text>}
      </View>
      {active && <View style={[styles.triangle]} />}
    </View>
  </TouchableOpacity>
);

TabItem.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onPress: PropTypes.func,
  dayNumber: PropTypes.string
};

TabItem.defaultProps = {
  active: false,
  onPress: () => {},
  dayNumber: undefined
};

{/*<TabItem onPress={this.onTabItemClick(0)} active text={'Today'}/>*/}
{/*<TabItem onPress={this.onTabItemClick(1)} text={'Tomorrow'} />*/}
{/*<TabItem onPress={this.onTabItemClick(2)} text={'Wed'} dayNumber={'09'} />*/}
{/*<TabItem onPress={this.onTabItemClick(3)} text={'Thu'} dayNumber={'10'} />*/}