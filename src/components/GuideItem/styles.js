import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const styles = StyleSheet.create({
  guideItemContentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 6,
  },
  guideItemMainContainer: {
    backgroundColor: colorPalette.som,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  guideItemImageContainer: {
    flex: 2,
    flexBasis: 50,
    flexGrow: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideItemImage: {
    width: 50,
    height: 50
  },
  guideItemNotificationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  guideItemNotificationIcon: {
    color: colorPalette.white
  }
});

export default styles;
