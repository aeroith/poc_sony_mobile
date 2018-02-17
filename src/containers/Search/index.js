import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import withTranslation from '../../components/Translation/index';
import styles from './styles';
import colorPalette from '../../config/colorPalette';

@withTranslation
export default class Search extends Component {
    static propTypes = {
      translate: PropTypes.func.isRequired,
      shouldRender: PropTypes.bool,
    };

    static defaultProps = {
      shouldRender: false,
    };

    constructor(props) {
      super(props);

      this.state = {
        query: '',
      };
    }

    handleOnChangeText = (query) => {
      console.log(query);
      this.setState({ query });
    };

    render() {
      const { shouldRender } = this.props;
      if(!shouldRender) return null;
      return (
        <View style={[styles.searchBarWrapper]}>
          <TextInput
            style={[styles.searchBarTextInput]}
            onChangeText={this.handleOnChangeText}
            value={this.state.query}
            placeholder="Search..."
            placeholderTextColor={colorPalette.grayText1}
          />
        </View>
      );
    }
}
