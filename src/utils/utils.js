export default class Utils {
  static getDeviceInfo() {
    const country = DeviceInfo.getDeviceCountry();
    const language = DeviceInfo.getDeviceLocale().split('-')[0];
    return { country, language };
  }
}
