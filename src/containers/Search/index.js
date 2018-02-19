import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import _debounce from 'lodash/debounce';
import Autocomplete from 'react-native-autocomplete-input';
import withTranslation from '../../components/Translation/index';
import styles from './styles';
import colorPalette from '../../config/colorPalette';
import SearchService from '../../services/searchService';

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
        data: [],
      };

      this.handleOnChangeText = _debounce(this.handleOnChangeText, 350);
    }

    handleOnChangeText = (query) => {
      console.log(query);
      this.setState({ query });
      if (query.length >= 3) {
        SearchService.getAutocompleteResults(query)
          .then(results => this.setState({ data: results }));
      }
    };

    handleAutocompleteItemSelect = selectedItem => () => {
      this.setState({ query: selectedItem.title, data: [] });
    };

    handleRenderItem = (item) => {
      const returnEl = (
        <TouchableOpacity onPress={this.handleAutocompleteItemSelect(item)}>
          <Text>{item.title}</Text>
        </TouchableOpacity>
      );
      return returnEl;
    };

    render() {
      const { shouldRender } = this.props;
      const { data, query } = this.state;
      if (!shouldRender) return null;
      return (
        <Autocomplete
          containerStyle={[styles.searchBarWrapper]}
          data={data}
          inputContainerStyle={styles.searchBarTextInputAutocomplete}
          defaultValue={query}
          onChangeText={this.handleOnChangeText}
          renderItem={this.handleRenderItem}
          renderTextInput={() => {
              return (
                  <TextInput onChangeText={this.handleOnChangeText} style={styles.searchBarTextInput}/>
              )
          }}
        />
      );
    }
}
