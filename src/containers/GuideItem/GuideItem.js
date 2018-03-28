import React, { Component } from 'react';
import { connect } from 'react-redux';
import GuideItem from '../../components/GuideItem';
import { actions as notificationActions } from '../../reducers/notification';
import { push } from '../../reducers/nav';

@connect(
  state => ({
    notifications: state.notification.notifications,
    routes: state.nav.routes,
  }),
  dispatch => ({
    setNotificationScheduled: notification =>
      dispatch(notificationActions.setNotificationScheduled(notification)),
    setNotification: notification =>
      dispatch(notificationActions.setNotification(notification)),
    unsetNotification: notification =>
      dispatch(notificationActions.unsetNotification(notification)),
    push: (...params) =>
      dispatch(push(...params))
  })
)
export default class GuideItemContainer extends Component {
  render() {
    return (
      <GuideItem {...this.props} />
    );
  }
}
