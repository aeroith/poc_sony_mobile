import { getDeviceCountry, getDeviceLocale } from 'react-native-device-info';
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
    if (env === 'development') {
      const { defaultCountry: country, defaultLanguage: language } = siteConfig;
      return {
        country,
        language,
        locale: `${language}_${country}`,
      };
    }
    const deviceLocale = getDeviceLocale().replace('-', '_');
    const country = getDeviceCountry();
    const language = deviceLocale.split('_')[0];
    return { country, language, locale: deviceLocale };
  }
  static getCurrentRoute(navState) {
    const navStackLength = navState ? navState.routes.length : 0;
    if (navStackLength === 0) return '';
    const { routeName } = navState.routes[navStackLength - 1];
    return _find(routeMappings, { routeName });
  }
  static getTMDBDateRange(tmdbDetail) {
    if (!tmdbDetail || _isEmpty(tmdbDetail)) return '';
    function getYear(dateString) {
      if (!dateString) return 'N/A';
      return dateString.split('-')[0];
    }
    const { first_air_date, last_air_date } = tmdbDetail;
    const firstAirDate = getYear(first_air_date);
    const lastAirDate = getYear(last_air_date);
    if (firstAirDate === lastAirDate) return `(${firstAirDate})`;
    return `(${firstAirDate} - ${lastAirDate})`;
  }
}
