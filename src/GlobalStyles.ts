import { createGlobalStyle } from '@xstyled/emotion';

export const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'poppins';
        src: url('/src/assets/fonts/poppins-v15-latin-ext_latin-regular.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'poppins';
        src: url('/src/assets/fonts/poppins-v15-latin-ext_latin-500.woff2') format('woff2');
        font-weight: 500;
        font-style: normal;
    }

    @font-face {
        font-family: 'direct-semibold';
        src: url('/src/assets/fonts/directyummo-semibold-webfont.woff2') format('woff2');
        font-weight: 500;
        font-style: normal;
    }

    [data-sr-only] {
        position: absolute;
        clip: rect(0, 0, 0, 0);
        border: 0;
        overflow: hidden;
        padding: 0;
        height: 1px;
        width: 1px;
        white-space: nowrap;
    }

    .react-datepicker-wrapper {
        display: inline-block;
        padding: 0;
        border: 0;
        width: 100%;
    }
`;
