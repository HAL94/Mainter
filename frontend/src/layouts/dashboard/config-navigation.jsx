import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
    activeWhen: [/^\/$/]
  },
  {
    title: 'clients',
    path: '/clients',
    icon: icon('ic_user'),
    activeWhen: [/^\/clients$/, /^\/clients\/add$/, /^\/clients\/edit\/\d/]
  },
  {
    title: 'vehicles',
    path: '/vehicles',
    icon: icon('ic_user'),
    activeWhen: [/^\/vehicles$/, /^\/vehicles\/add$/, /^\/vehicles\/edit\/\d/]
  },
  {
    title: 'product',
    path: '/products',
    icon: icon('ic_cart'),
    activeWhen: [/^\/products$/]
  },
  {
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog'),
    activeWhen: [/^\/blog$/]

  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
    activeWhen: [/^\/login$/]

  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
    activeWhen: [/^\/404$/]

  },
];

export default navConfig;
