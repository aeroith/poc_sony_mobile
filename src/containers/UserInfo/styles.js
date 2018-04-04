import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const styles = StyleSheet.create({
  userInfoWrapper: {
    borderBottomColor: colorPalette.grayBorder1,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
  },
  userAvatar: {
    marginLeft: 3,
  },
  userName: {
    flex: 1,
    color: colorPalette.white,
    paddingLeft: 12,
    fontWeight: 'bold'
  },
  logoutButton: {
    width: 55,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
export default styles;
