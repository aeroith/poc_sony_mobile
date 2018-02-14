import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import withTranslation from '../../components/Translation';

@withTranslation
export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
  };

  toCounter = () => {
    this.props.navigation.navigate('Counter');
  };

  render() {
    const { translate } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{translate('welcome_text')}</Text>
        <TouchableOpacity onPress={this.toCounter}>
          <Text style={styles.instructions}>{translate('navigate_to_counter')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
