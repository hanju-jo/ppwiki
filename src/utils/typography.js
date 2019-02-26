import Typography from 'typography';
import theme from 'typography-theme-Wikipedia'

theme.bodyFontFamily = ['Noto Sans KR', 'sans-serif'];
theme.googleFonts = [
  {
    name: 'Noto Sans KR',
    styles: ['400', '400i'],
  },
];
theme.overrideThemeStyles = ({ rhythm }) => ({
  'ol,ul': {
    listStyleImage: null,
    marginLeft: rhythm(1.5),
  }
})

const typography = new Typography(theme);

export default typography;
