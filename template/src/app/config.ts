import HomeIcon from '@mui/icons-material/Home';
import TableChartIcon from '@mui/icons-material/TableChart';

export const menus = [
  {
    Icon: HomeIcon,
    name: 'Home',
    route: '/'
  },
  {
    Icon: TableChartIcon,
    isDivider: true,
    name: 'Table',
    route: '/table'
  },
]