import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import withTranslation from '../../hocs/Translation/index';
import ProgramContent from '../../components/ProgramContent';
import { actions as programActions } from '../../reducers/program';

@withTranslation
@connect(
  // state => ({
  //     program: state.program
  // }),
  null,
  programActions,
)
export default class Program extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    translate: PropTypes.func.isRequired
  };

  static defaultProps = {
    navigation: {}
  };

  componentDidMount() {
    if (this.props.navigation && this.props.navigation.state.params) {
      const programId = this.props.navigation.state.params.id;
      console.log('programId:', programId);
      this.props.getProgramWithEpisodes(programId);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ProgramContent isLoading={false} translate={this.props.translate} />
      </View>
    );
  }
}
