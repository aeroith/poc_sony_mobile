import { Dimensions, StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
    zIndex: 9999,
    paddingHorizontal: 30,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colorPalette.white,
    marginBottom: 40,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  facebookLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: deviceWidth * 0.8,
    backgroundColor: colorPalette.facebookBlue,
  },
  facebookLoginButtonIconWrapper: {
    height: 50,
    width: 50,
    backgroundColor: colorPalette.facebookBlueDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookLoginButtonText: {
    flex: 1,
    color: colorPalette.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 14,
    fontWeight: 'bold',
  },
  cancelLoginButton: {
    borderWidth: 1,
    borderColor: colorPalette.white,
    backgroundColor: colorPalette.transparent,
    width: deviceWidth * 0.8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  cancelLoginButtonText: {
    color: colorPalette.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
export default styles;
