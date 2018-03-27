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
  state => ({
    program: state.program
  }),
  programActions,
)
export default class Program extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    translate: PropTypes.func.isRequired,
    setProgramHeaderVisibility: PropTypes.func.isRequired,
    getProgramWithEpisodes: PropTypes.func.isRequired,
    program: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    navigation: {},
    program: { details: null },
  };

  componentDidMount() {
    if (this.props.navigation && this.props.navigation.state.params) {
      const programId = this.props.navigation.state.params.id;
      this.props.getProgramWithEpisodes(programId);
    }
  }

  handleOnChangeProgramPageHeader = (transparent) => {
    this.props.setProgramHeaderVisibility(transparent);
  };

  render() {
    const shouldRender = !!(this.props.program && this.props.program.details);
    return (
      <View style={styles.container}>
        <ProgramContent
          onChangeProgramPageHeader={this.handleOnChangeProgramPageHeader}
          isLoading={!shouldRender}
          program={this.props.program}
          translate={this.props.translate}
        />
      </View>
    );
  }
}
