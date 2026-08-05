import HomeIcon from '@mui/icons-material/Home';
import FastfoodIcon from '@mui/icons-material/Restaurant';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CodeIcon from '@mui/icons-material/Code';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CategoryIcon from '@mui/icons-material/Category';
import FlightIcon from '@mui/icons-material/Flight';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import RedeemIcon from '@mui/icons-material/Redeem';

export const finIcons = {
  home: <HomeIcon />,
  food: <FastfoodIcon />,
  car: <DirectionsCarIcon />,
  sports: <SportsEsportsIcon />,
  shopping: <ShoppingBagIcon />,
  code: <CodeIcon />,
  money: <AttachMoneyIcon />,
  wallet: <AccountBalanceWalletIcon />,
  movie: <LocalMoviesIcon />,
  school: <SchoolIcon />,
  trending_up: <TrendingUpIcon />,
  trending_down: <TrendingDownIcon />,
  favorite: <FavoriteIcon />,
  category: <CategoryIcon />,
  flight: <FlightIcon />,
  bolt: <ElectricBoltIcon />,
  redeem: <RedeemIcon />,
} as const;

export type FinIconType = keyof typeof finIcons;
