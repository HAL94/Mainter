import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    id: 'nav_0',
    title: { en: 'Dashboard', ar: 'الرئيسية' },
    path: '/',
    icon: icon('ic_analytics'),
    activeWhen: [/^\/$/]
  },
  {
    id: 'nav_1',
    title: { en: 'Clients', ar: 'العملاء' },
    path: '/clients',
    icon: <Iconify icon='mdi:user-outline' />,
    activeWhen: [/^\/clients$/, /^\/clients\/add$/, /^\/clients\/edit\/\d/]
  },
  {
    id: 'nav_2',
    title: { en: 'Vehicles', ar: 'المركبات' },
    path: '/vehicles',
    icon: <Iconify icon='mdi:car' />,
    activeWhen: [/^\/vehicles$/, /^\/vehicles\/add$/, /^\/vehicles\/edit\/\d/]
  },
  {
    id: 'nav_3',
    title: { en: 'jobs', ar: 'أوامر الصيانة' },
    path: '/jobs',
    icon: <Iconify icon='mingcute:task-2-fill' />,
    activeWhen: [/^\/jobs$/, /^\/jobs\/add$/, /^\/jobs\/edit\/\d/]
  }
];

export default navConfig;
