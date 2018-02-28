import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const styles = StyleSheet.create({
  searchBarWrapper: {
    height: 30,
    marginTop: 30,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  searchBarTextInputWrapper: {
    position: 'relative',
  },
  searchBarTextInput: {
    color: colorPalette.white,
    fontWeight: '300',
    fontSize: 13,
    height: 30,
    paddingHorizontal: 10,
  },
  searchBarSpinnerWrapper: {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: colorPalette.transparent,
  },
  searchBarTextInputAutocomplete: {
    borderColor: colorPalette.grayText2,
    borderWidth: 1,
    borderRadius: 4,
  },
  searchBar__invisible: {
    height: 0,
    borderWidth: 0,
  },
  searchBarAutocompleteItemContainer: {
    borderColor: colorPalette.grayText2,
  },
  searchBarAutocompleteItemWrapper: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colorPalette.grayBorderAutocomplete,
    borderStyle: 'solid',
  },
  searchBarAutocompleteItemImage: {
    height: 40,
    width: 30,
    backgroundColor: colorPalette.dummyImageColor,
  },
  searchBarAutocompleteItemTextView: {
    flex: 1,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
  },
  searchBarAutocompleteItemText: {
    fontSize: 13,
  },
  searchBarAutocompleteItemNextAiring: {
    fontSize: 10,
    color: colorPalette.grayText2,
  },


});
export default styles;
