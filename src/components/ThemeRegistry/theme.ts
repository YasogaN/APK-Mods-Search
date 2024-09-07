import { extendTheme } from '@mui/joy/styles';
import { JetBrains_Mono, Source_Code_Pro } from 'next/font/google';

const jb_mono = JetBrains_Mono({
  subsets: ['latin'],
  adjustFontFallback: false,
  fallback: [
    'ui-monospace',
    'SFMono-Regular',
    'Menlo',
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace',
  ],
  display: 'swap',
})

const theme = extendTheme({
  fontFamily: {
    body: jb_mono.style.fontFamily,
    display: jb_mono.style.fontFamily,
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === 'primary' && {
            backgroundColor: '#4338ca',
          }),
        }),
      },
    },
    JoyLink: {
      styleOverrides: {
        root: {
          color: 'rgb(81, 222, 196)',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'none',
          },
        },
      },
    },
  },
});

export default theme;
