import { createGlobalStyle } from 'styled-components';

const FontStyles = createGlobalStyle`
  @font-face {
    font-family: 'Abhaya Libre';
    src: url('https://fonts.cdnfonts.com/s/16309/AbhayaLibre-ExtraBold.woff') format('woff');
    font-weight: 800;
    font-style: normal;
  }

  /* Other global styles can be added here */
`;

export default FontStyles;
