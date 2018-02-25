import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Guide from '../../components/Guide';
import styles from './styles';
import siteConfig from '../../config/siteConfig'
import { actions as guideActions } from '../../reducers/guide';
import withTranslation from '../../hocs/Translation';

@withTranslation
@connect(
  state => ({
    guide: state.guide.guide,
    timeStart: state.tabbedDatePicker.timeStart,
    timeEnd: state.tabbedDatePicker.timeEnd,
    isLoading: state.guide.isLoading,
    lang: state.app.lang,
  }),
  guideActions
)
export default class GuideContainer extends Component {
  static propTypes = {
    setTvGuideResults: PropTypes.func.isRequired,
    timeStart: PropTypes.number.isRequired,
    timeEnd: PropTypes.number.isRequired,
    isLoading: PropTypes.bool,
    translate: PropTypes.func.isRequired,
    lang: PropTypes.string,
  };

  static defaultProps = {
    isLoading: false,
    lang: siteConfig.defaultLanguage,
  };

  componentDidMount() {
    const { timeStart, timeEnd } = this.props;
    this.props.setTvGuideResults(timeStart, timeEnd);
  }

  render() {
    return (
      <View style={[styles.mainContainer, this.props.isLoading && styles.centerContainer]}>
        <Guide {...this.props} />
      </View>
    );
  }
}

GuideContainer.defaultProps = {
  isLoading: false,
};
