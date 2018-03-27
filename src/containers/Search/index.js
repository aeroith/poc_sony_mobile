import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Image from '../../components/Image';
import _debounce from 'lodash/debounce';
import Autocomplete from 'react-native-autocomplete-input';
import { connect } from 'react-redux';
import config from '../../config/config';
import withTranslation from '../../hocs/Translation/index';
import styles from './styles';
import colorPalette from '../../config/colorPalette';
import SearchService from '../../services/searchService';
import Spinner from '../../components/Spinner';
import { actions as searchBarActions } from '../../reducers/search';
import { push } from '../../reducers/nav';

@withTranslation
@connect(
  state => ({
    systemName: state.app.systemName,
    channelId: state.app.channelId,
  }),
  dispatch => ({
    setSearchBarState: searchBarState => dispatch(searchBarActions.setSearchBarState(searchBarState))
  })
)
export default class Search extends Component {
    static propTypes = {
      translate: PropTypes.func.isRequired,
      shouldRender: PropTypes.bool,
      systemName: PropTypes.string,
    };

    static defaultProps = {
      shouldRender: false,
      systemName: 'iOS'
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

    componentWillReceiveProps(nextProps) {
      if (this.props.shouldRender !== nextProps.shouldRender && !nextProps.shouldRender) {
        this.clearSearchBar();
      }
    }

    getAutocompleteResults = (query) => {
      if (query.length >= 3) {
        const { channelId } = this.props;
        this.setState({ loading: true });
        SearchService.getAutocompleteResults(query, channelId)
          .then(results => this.setState({ data: results, loading: false }));
      }
    };

    handleOnChangeText = (query) => {
      this.setState({ query, data: [] });
      this.getAutocompleteResults(query);
    };

    handleAutocompleteItemSelect = selectedItem => () => {
      this.setState({ query: selectedItem.name, data: [] });
      this.props.setSearchBarState(false);
      if (selectedItem.id) {
        const { routes } = this.props.navigation.state;
        const currentRouteName = routes[routes.length - 1].routeName;
        this.props.navigation.dispatch(push('Program', currentRouteName, { id: selectedItem.id }));
      }
    };

    getType = (typeEnum) => {
      const translateKey = typeEnum || 'nextAiring_na';
      return this.props.translate(translateKey);
    };

    handleRenderItem = (item) => {
      const itemType = this.getType(item.type);
      return (
        <TouchableOpacity
          style={styles.searchBarAutocompleteItemWrapper}
          onPress={this.handleAutocompleteItemSelect(item)}
        >
          <Image
            height={40}
            width={30}
            style={styles.searchBarAutocompleteItemImage}
            uri={item.tmdbImagePath || config.dummyImageUrl}
          />
          <View style={styles.searchBarAutocompleteItemTextView}>
            <Text style={styles.searchBarAutocompleteItemText}>{item.name}</Text>
            <Text style={styles.searchBarAutocompleteItemNextAiring}>{`${itemType} ${item.dateRange}`}</Text>
          </View>
        </TouchableOpacity>
      );
    };

    clearSearchBar = () => {
      this.setState({ data: [], query: '', loading: false });
    };

    handleOnBlur = () => {
      this.clearSearchBar();
      this.props.setSearchBarState(false);
    };

    renderTextInput = () => (
      <View style={styles.searchBarTextInputWrapper}>
        <TextInput
          onChangeText={this.handleOnChangeText}
          style={styles.searchBarTextInput}
          placeholder={this.props.translate('search')}
          placeholderTextColor={colorPalette.grayText1}
          value={this.state.query}
          autoFocus
          onBlur={this.handleOnBlur}
        />
        {this.state.loading && (
          <Spinner
            wrapperStyle={styles.searchBarSpinnerWrapper}
          />
        )}
      </View>
    );

    renderAutocomplete = () => {
      const { data, query } = this.state;
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
    };

    render() {
      const { shouldRender, systemName } = this.props;
      if (!shouldRender) return null;
      const autocompleteRendered = this.renderAutocomplete();
      if (systemName === 'iOS') return autocompleteRendered;
      if (systemName === 'Android') {
        return (
          <View style={styles.autocompleteContainer}>
            { autocompleteRendered }
          </View>
        );
      }
      return autocompleteRendered;
    }
}
