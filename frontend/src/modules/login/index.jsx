import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import LoginFormContainer from 'src/forms/login';
import useLanguage from 'src/locale/useLanguage';
import { bgGradient } from 'src/providers/theme/css';
import LanguagePopover from 'src/layouts/dashboard/common/language-popover';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const translate = useLanguage();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%', px: 3, py: 2, height: 'auto' }}>
        <Logo />

        <LanguagePopover />
      </Stack>

      <Stack alignItems="center" justifyContent="center" sx={{ height: `calc(100vh - 72px)` }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,                     
          }}
        >
          <Typography mb={5} variant="h4">{translate('signIn')}</Typography>

          <LoginFormContainer />
        </Card>
      </Stack>
    </Box>
  );
}
