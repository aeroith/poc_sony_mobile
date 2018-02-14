import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableHighlight } from 'react-native';
import styles from './styles';
import withTranslation from '../Translation';

@withTranslation
export default class Counter extends Component {
  static propTypes = {
    increment: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired,
    translate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { incrementAsync } = props;
    this.incrementAsync = () => incrementAsync();
  }

  render() {
    const {
      increment, incrementIfOdd, decrement, counter, translate
    } = this.props;
    return (
      <View>
        <Text style={styles.text}>{`${translate('clicked')}: ${counter} ${translate('times')}`}</Text>
        <TouchableHighlight onPress={increment}>
          <Text style={styles.text}>+</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={decrement}>
          <Text style={styles.text}>-</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={incrementIfOdd}>
          <Text style={styles.text}>{translate('increment_odd')}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.incrementAsync}>
          <Text style={styles.text}>{translate('increment_async')}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
