import { getDeviceCountry, getDeviceLocale, getSystemName, getSystemVersion } from 'react-native-device-info';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';
import siteConfig from '../config/siteConfig';
import routeMappings from '../config/routeMappings';

export default class Utils {
  static getEnv() {
    const env = process && process.env && process.env.NODE_ENV
      ? process.env.NODE_ENV
      : 'development';
    console.log('NODE_ENV: ', env);
    return env;
  }
  static getDeviceInfo(env) {
    const systemName = getSystemName();
    const systemVersion = getSystemVersion();
    if (env === 'development') {
      const { defaultCountry: country, defaultLanguage: language } = siteConfig;
      return {
        country,
        language,
        locale: `${language}_${country}`,
        systemVersion,
        systemName,
      };
    }
    const deviceLocale = getDeviceLocale().replace('-', '_');
    const country = getDeviceCountry();
    const language = deviceLocale.split('_')[0];
    return {
      country, language, systemName, systemVersion, locale: deviceLocale
    };
  }
  static getCurrentRoute(navState) {
    const navStackLength = navState ? navState.routes.length : 0;
    if (navStackLength === 0) return '';
    const { routeName } = navState.routes[navStackLength - 1];
    return _find(routeMappings, { routeName });
  }
  static getChannelEnum = channelName => channelName.toLowerCase().replace(/\s/g, '_')
}
