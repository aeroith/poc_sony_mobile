import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from './styles';
import withTranslation from '../../hocs/Translation/index';
import ProgramTypeTabSelector from '../../containers/ProgramTypeTabSelector';
import { actions as programActions } from '../../reducers/programs';

@withTranslation
@connect(
  state => ({
    selectedType: state.programs.selectedType,
  }),
  programActions,
)
export default class Programs extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={styles.emptyContainer}
        />
        <ProgramTypeTabSelector
          selectedType={this.props.selectedType}
          setProgramType={this.props.setProgramType}
          translate={this.props.translate}
        />
      </View>
    );
  }
}
