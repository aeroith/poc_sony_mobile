import React, { Component } from 'react';
import config from '../../config/config';
import translations from '../../config/translations';

const withTranslation = ComponentRaw => class WrappedComponent extends Component {
  constructor(props) {
    super(props);
    this.translate = key => translations[config.lang][key] || key;
  }
  render() {
    return <ComponentRaw {...this.props} translate={this.translate} />;
  }
};

export default withTranslation;
