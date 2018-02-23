import React, { PureComponent } from 'react';
import { View, } from 'react-native';
import PropTypes from 'prop-types';
import Spinner from '../../components/Spinner';
import styles from './styles';

const withLoadingBar = Component => class extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    iconStyle: Spinner.propTypes.iconStyle,
    iconSize: PropTypes.number,
  };

  static defaultProps = {
    iconStyle: styles.iconStyleDefault,
    iconSize: 40,
  };

  render() {
    const {
      isLoading,
      iconStyle,
      iconSize,
      ...props
    } = this.props;

    if (isLoading) {
      return (
        <View style={styles.loadingWrapper}>
          <Spinner iconStyle={iconStyle || styles.iconStyleDefault} iconSize={iconSize || 40} />
        </View>
      );
    }
    return (
      <Component {...props} />
    );
  }
};


export default withLoadingBar;
