import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './styles';
import withLoadingBar from '../../hocs/WithLoadingBar/WithLoadingBar';

@withLoadingBar
export default class ProgramContent extends Component {
    static propTypes = {
      translate: PropTypes.func.isRequired,
      isLoading: PropTypes.bool.isRequired
    };

    render() {
      return (
        <View style={styles.container}>
          <Text>ProgramContent Holder Component</Text>
        </View>
      );
    }
}
