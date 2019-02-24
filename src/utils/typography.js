import Typography from 'typography';
import theme from 'typography-theme-Wikipedia'

theme.bodyFontFamily = ['Noto Sans KR', 'sans-serif'];
theme.googleFonts = [
  {
    name: 'Noto Sans KR',
    styles: ['400', '400i'],
  },
];

const typography = new Typography(theme);

export default typography;
