import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  toCounter = () => {
    this.props.navigation.navigate('Counter');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native Boilerplate!</Text>
        <TouchableOpacity onPress={this.toCounter}>
          <Text style={styles.instructions}>Navigate to Counter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
