import { getDeviceCountry, getDeviceLocale } from 'react-native-device-info';
import siteConfig from '../config/siteConfig';

export default class Utils {
  static getEnv() {
    const env = process && process.env && process.env.NODE_ENV
      ? process.env.NODE_ENV
      : 'development';
    console.log('NODE_ENV: ', env);
    return env;
  }
  static getDeviceInfo(env) {
    if (env === 'development') {
      return {
        country: siteConfig.defaultCountry,
        language: siteConfig.defaultLanguage
      };
    }
    const country = getDeviceCountry();
    const language = getDeviceLocale().split('-')[0];
    return { country, language };
  }
  static getCurrentRouteName(navState) {
    const navStackLength = navState ? navState.routes.length : 0;
    if (navStackLength === 0) return '';
    return navState.routes[navStackLength - 1].routeName.toLowerCase();
  }
}
