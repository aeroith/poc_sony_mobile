import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import _debounce from 'lodash/debounce';
import Autocomplete from 'react-native-autocomplete-input';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import config from '../../config/config';
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
      this.momentFormat = 'dddd, MMMM Do, h:mm:ss a';
      this.state = {
        query: '',
        data: [],
        loading: false,
      };

      this.getAutocompleteResults = _debounce(this.getAutocompleteResults, 350);
    }

    getAutocompleteResults = (query) => {
      if (query.length >= 3) {
        this.setState({ loading: true });
        SearchService.getAutocompleteResults(query)
          .then(results => this.setState({ data: results, loading: false }));
      }
    };

    handleOnChangeText = (query) => {
      this.setState({ query, data: [] });
      this.getAutocompleteResults(query);
    };

    handleAutocompleteItemSelect = selectedItem => () => {
      this.setState({ query: selectedItem.Title, data: [] });
    };

    getNextAiring = (nextAiring) => {
      if (!nextAiring) return this.props.translate('nextAiring_na');
      const momentTime = moment(nextAiring * 1000);
      return momentTime.format(this.momentFormat);
    };

    handleRenderItem = (item) => {
      const nextAiring = this.getNextAiring(item.nextAiring);
      return (
        <TouchableOpacity
          style={styles.searchBarAutocompleteItemWrapper}
          onPress={this.handleAutocompleteItemSelect(item)}
        >
          <Image
            style={styles.searchBarAutocompleteItemImage}
            source={{ uri: item.tmdbImagePath || config.dummyImageUrl }}
          />
          <View style={styles.searchBarAutocompleteItemTextView}>
            <Text style={styles.searchBarAutocompleteItemText}>{item.Title}</Text>
            <Text style={styles.searchBarAutocompleteItemNextAiring}>{nextAiring}</Text>
          </View>
        </TouchableOpacity>
      );
    };

    handleOnBlur = () => {
      this.setState({ data: [] });
    };

    renderTextInput = () => {
      console.log('rendered');
      return (
        <View style={styles.searchBarTextInputWrapper}>
          <TextInput
            onChangeText={this.handleOnChangeText}
            style={styles.searchBarTextInput}
            placeholder={this.props.translate('search')}
            placeholderTextColor={colorPalette.grayText1}
            value={this.state.query}
            onBlur={this.handleOnBlur}
          />
          {this.state.loading && (
          <Icon
            style={styles.searchBarSpinner}
            name="loader"
            size={15}
            color={colorPalette.grayText1}
          />
          )}
        </View>
      );
    };

    render() {
      const { shouldRender } = this.props;
      const { data, query } = this.state;
      if (!shouldRender) return null;
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
