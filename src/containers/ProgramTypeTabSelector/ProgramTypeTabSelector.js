import React from 'react';
import ProgramTypeTabSelector from '../../components/ProgramTypeTabSelector';

export default class ProgramTypeTabSelectorContainer extends React.PureComponent {
  render() {
    return (
      <ProgramTypeTabSelector {...this.props} />
    );
  }
}
