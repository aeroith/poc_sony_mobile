import { StyleSheet, Dimensions } from 'react-native';
import colorPalette from '../../config/colorPalette';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainTouchableContainer: {
    justifyContent: 'space-between',
    flex: 7,
    flexDirection: 'row'
  },
  imageContainer: {
    backgroundColor: colorPalette.grayBg5,
    borderRightWidth: 0.5,
    borderColor: colorPalette.grayText3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 0,
    flexBasis: 120,
  },
  contentContainer: {
    backgroundColor: colorPalette.grayBg5,
    zIndex: 1,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  notificationTextContainer: {
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 15,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1.5,
    backgroundColor: colorPalette.grayBg5,
  },
  moreIcon: {
    color: colorPalette.carouselActive,
  },
  hiddenDeleteMenu: {
    position: 'absolute',
    backgroundColor: 'yellow',
    right: 0,
    width: '100%',
    height: 79,
    zIndex: -99
  },
  title: {
    marginVertical: 1.5,
    fontSize: 16,
    fontWeight: '700',
    color: colorPalette.white
  },
  info: {
    marginVertical: 1.5,
    fontSize: 12,
    fontWeight: '400',
    color: colorPalette.grayText1
  },
  date: {
    marginVertical: 1.5,
    fontSize: 12,
    fontWeight: '400',
    color: colorPalette.grayText1,
  }
});

export default styles;
