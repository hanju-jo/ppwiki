import Typography from 'typography';
import theme from 'typography-theme-Wikipedia'

theme.headerFontFamily = ['Noto Sans KR', 'sans-serif'];
theme.bodyFontFamily = ['Noto Sans KR', 'sans-serif'];
theme.googleFonts = [
  {
    name: 'Noto Sans KR',
    styles: ['400', '400i', '700'],
  },
];
theme.overrideThemeStyles = ({ rhythm }) => ({
  'h1,h2,h3,h4,h5,h6': {
    fontWeight: 700
  },
  'ol,ul': {
    listStyleImage: null,
    marginLeft: rhythm(1.5),
  }
})

const typography = new Typography(theme);

export default typography;
