import PropTypes from 'prop-types';

import ThemeProvider from './theme';

export default function AppProviders({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

AppProviders.propTypes = {
  children: PropTypes.node,
};
