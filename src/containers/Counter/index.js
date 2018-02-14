import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Counter from '../../components/Counter';
import { actions as counterActions } from '../../reducers/counter';
import styles from './styles';

@connect(
  state => ({
    counter: state.counter.value,
  }),
  counterActions
)
export default class CounterContainer extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  handleBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <Counter {...this.props} />
        <TouchableOpacity onPress={this.handleBack}>
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
