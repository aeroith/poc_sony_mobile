import React, { Component } from 'react';
import { connect } from 'react-redux';
import translations from '../../config/translations';

const withTranslation = (ComponentRaw) => {
  class WrappedComponent extends Component {
    getValue(key, language) {
      let rootObj = translations[language || 'default'];
      key.split('.').some((pathPart) => {
        rootObj = rootObj[pathPart];
        return rootObj === undefined;
      });
      return rootObj || (language && this.getValue(key)) || key;
    }
    render() {
      const translateFn = (key) => {
        const language = this.props.language && this.props.language.length > 0
          ? this.props.language
          : 'en';
        if (!key || key.length === 0 || typeof key !== 'string') return key;
        return this.getValue(key, language);
      };
      return <ComponentRaw {...this.props} translate={translateFn} />;
    }
  }
  return connect(state => ({
    language: state.app.language
  }))(WrappedComponent);
};

export default withTranslation;
