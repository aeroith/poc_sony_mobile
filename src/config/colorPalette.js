import siteConfig from './siteConfig';

const colorPalette = {
  themes: {
    smcDark: {
      som: '#111416',
      white: '#ffffff',
      dirtyWhite: '#ecf0f1',
      black: '#000000',
      grayBg1: '#3d4149', // Tabs background
      grayBg2: '#2b2d31', // Tabs subtitle background
      grayBg3: 'rgba(29,34,36,1)', // Header background
      grayBg3a: 'rgba(17,20,22,0.9)', // Header background - Gradient start
      grayBg4: '#1a1b1e', // Guide hours background
      grayBg5: '#141517', // Guide text background
      grayBorder1: '#101112', // Child menu item border
      grayText1: '#8b8d91', // Tabs text color
      grayText2: '#3d4146', // Tabs sub-text color
      grayText3: '#2b2d31', // Tabs sub-text color
      grayBorderAutocomplete: '#ededed',
      carousel: '#4e555b',
      carouselActive: '#99a4ad',
      tag: {
        new: '#7337e2',
        popular: '#4b7bec'
      },
      cyan1: '#39e0d5',
      red: '#e50914',
      pinkBg: '#da287a',
      greenBg1: '#005d70',
      dummyImageColor: '#e0e0e0',
      facebookBlue: '#3b5998',
      facebookBlueDark: '#384D89',
      transparent: 'transparent',
    },
  },
  getColors(themeName) {
    return this.themes[themeName] || 'smcDark';
  }
};
const exportedTheme = colorPalette.getColors(siteConfig.UITheme);
export default exportedTheme;
