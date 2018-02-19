import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const style = StyleSheet.create({
  tagContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    paddingHorizontal: 5,
    borderRadius: 2,
    backgroundColor: colorPalette.new,
    shadowColor: colorPalette.black,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
  },
  tagText: {
    letterSpacing: 1.2,
    fontWeight: '700',
    color: colorPalette.white,
    fontSize: 12,
  }
});

export default style;
