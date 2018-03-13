import React from 'react';
import ProgramTypeTabSelector from '../../components/ProgramTypeTabSelector';
import withTranslation from "../../hocs/Translation";

export default class ProgramTypeTabSelectorContainer extends React.PureComponent {
  render() {
    return (
      <ProgramTypeTabSelector {...this.props} />
    );
  }
}
