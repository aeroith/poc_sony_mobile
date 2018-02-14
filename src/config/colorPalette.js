import config from './config';

const colorPalette = {
  themes: {
    smcDark: {
      white: '#ffffff',
      grayBg1: '#3d4149', // Tabs background
      grayBg2: '#2b2d31', // Tabs subtitle background
      grayBg3: '#1d2224', // Header background
      grayBg4: '#1a1b1e', // Guide hours background
      grayBg5: '#141517', // Guide text background
      grayText1: '#8b8d91', // Tabs text color
      grayText2: '#3d4146', // Tabs sub-text color
      grayText3: '#2b2d31', // Tabs sub-text color
      purpleBg1: '#7337e2', // Tag color
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
