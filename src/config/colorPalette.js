import config from './config';

const colorPalette = {
  themes: {
    smcDark: {
      white: '#ffffff',
      grayBg1: '#3d4149',
      grayBg2: '#2b2d31',
      grayBg3: '#1a1b1e',
      grayBg4: '#141517',
      grayText1: '#8b8d91',
      grayText2: '#3d4146',
      grayText3: '#2b2d31',
      purpleBg1: '#7337e2',
      cyan1: '#39e0d5',
      redBg: '#f02f27',
      pinkBg: '#da287a',
      greenBg1: '#005d70'
    },
  },
  getColors(themeName) {
    return this.themes[themeName] || 'smcDark';
  }
};
const exportedTheme = colorPalette.getColors(config.UITheme);
export default exportedTheme;
