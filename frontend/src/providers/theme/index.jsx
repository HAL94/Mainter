import { prefixer } from 'stylis';
import PropTypes from 'prop-types';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { useMemo, useEffect } from 'react';
import { CacheProvider } from '@emotion/react';

import { arEG, enUS } from '@mui/material/locale';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { isRTL } from 'src/locale/useLanguage';

import { palette } from './palette';
import { shadows } from './shadows';
import { overrides } from './overrides';
import { typography } from './typography';
import { customShadows } from './custom-shadows';

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  const memoizedValue = useMemo(
    () => ({
      palette: palette(),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    []
  );

  useEffect(() => {
    document.dir = isRTL() ? 'rtl' : 'ltr';
  }, []);

  const theme = createTheme(
    {
      ...memoizedValue,
      direction: isRTL() ? 'rtl' : 'ltr',
      typography: {
        ...typography,
        fontFamily: isRTL() ? "'Cairo', sans-serif" : typography.fontFamily,
      },
    },
    isRTL() ? arEG : enUS
  );

  theme.components = overrides(theme);

  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const emptyCache = createCache({
    key: 'meaningless-key',
  });

  return (
    <CacheProvider value={isRTL() ? cacheRtl : emptyCache}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </CacheProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
