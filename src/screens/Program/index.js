import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from './styles';
import withTranslation from '../../hocs/Translation/index';
import ProgramContent from '../../components/ProgramContent';

@withTranslation
export default class Program extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <ProgramContent isLoading={false} translate={this.props.translate} />
      </View>
    );
  }
}
