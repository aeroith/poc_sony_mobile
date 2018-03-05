import React, { Component } from 'react';
import { connect } from 'react-redux';
import GuideItem from '../../components/GuideItem';
import { actions as notificationActions } from '../../reducers/notification';

@connect(
  state => ({
    notifications: state.notification.notifications
  }),
  notificationActions
)
export default class GuideItemContainer extends Component {
  render() {
    return (
      <GuideItem {...this.props} />
    );
  }
}
