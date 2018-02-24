import React, { Component } from 'react';
import { connect } from 'react-redux';
import translations from '../../config/translations';

const withTranslation = (ComponentRaw) => {
  class WrappedComponent extends Component {
    constructor(props) {
      super(props);
      this.translate = (key) => {
        if (!key || key.length === 0 || typeof key !== 'string') return '';
        return translations[this.props.language][key] || key;
      };
    }
    render() {
      return <ComponentRaw {...this.props} translate={this.translate} />;
    }
  }
  return connect(state => ({
    language: state.app.language
  }))(WrappedComponent);
};

export default withTranslation;
