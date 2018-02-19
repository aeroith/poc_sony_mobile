import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
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

      this.getAutocompleteResults = _debounce(this.getAutocompleteResults, 350);
    }

    getAutocompleteResults = (query) => {
      if (query.length >= 3) {
        SearchService.getAutocompleteResults(query)
          .then(results => this.setState({ data: results }));
      }
    };

    handleOnChangeText = (query) => {
      this.setState({ query });
      this.getAutocompleteResults(query);
    };

    handleAutocompleteItemSelect = selectedItem => () => {
      this.setState({ query: selectedItem.Title, data: [] });
    };

    handleRenderItem = (item) => {
      const returnEl = (
        <TouchableOpacity
          style={styles.searchBarAutocompleteItemWrapper}
          onPress={this.handleAutocompleteItemSelect(item)}
        >
          <Image
            style={styles.searchBarAutocompleteItemImage}
            source={{ uri: item.tmdbImagePath }}
          />
          <View style={styles.searchBarAutocompleteItemTextView}>
            <Text style={styles.searchBarAutocompleteItemText}>{item.Title}</Text>
            <Text style={styles.searchBarAutocompleteItemNextAiring}>{item.nextAiring}</Text>
          </View>
        </TouchableOpacity>
      );
      return returnEl;
    };

    renderTextInput = () => (<TextInput
      onChangeText={this.handleOnChangeText}
      style={styles.searchBarTextInput}
      placeholder={this.props.translate('search')}
      placeholderTextColor={colorPalette.grayText1}
      value={this.state.query}
    />);

    render() {
      const { shouldRender } = this.props;
      const { data, query } = this.state;
      if (!shouldRender) return null;
      console.log('this.state.data', data);
      return (
        <Autocomplete
          containerStyle={styles.searchBarWrapper}
          data={data}
          inputContainerStyle={styles.searchBarTextInputAutocomplete}
          listContainerStyle={styles.searchBarAutocompleteItemContainer}
          defaultValue={query}
          onChangeText={this.handleOnChangeText}
          renderItem={this.handleRenderItem}
          renderTextInput={this.renderTextInput}
        />
      );
    }
}
