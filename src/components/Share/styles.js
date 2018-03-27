import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const styles = {
  shareWrapper: StyleSheet.create({
    main: {
      borderWidth: 1,
      borderColor: colorPalette.grayText1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
  icon: StyleSheet.create({
    shareWrapper: {
      color: colorPalette.dirtyWhite,
    },
  }),
};

export default styles;
