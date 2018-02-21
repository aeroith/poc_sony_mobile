import React, { Component } from 'react';
import { View } from 'react-native';
import Guide from '../../components/Guide';
import styles from './styles';
import { actions as guideActions } from '../../reducers/guide';
import { connect } from "react-redux";

@connect(
  state => ({
    guide: state.guide.guide,
  }),
  guideActions
)
export default class GuideContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTvGuide();
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Guide {...this.props} />
      </View>
    );
  }
}