import HomeIcon from '@mui/icons-material/Home';
import FastfoodIcon from '@mui/icons-material/Restaurant';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CodeIcon from '@mui/icons-material/Code';

export const mockCategories = [
  {
    categoryName: 'Moradia',
    transactionCount: 8,
    currentSpending: 3200,
    budgetGoal: 3500,
    icon: <HomeIcon />,
    color: '#38bdf8',
  },
  {
    categoryName: 'Alimentação',
    transactionCount: 34,
    currentSpending: 2100,
    budgetGoal: 2000,
    icon: <FastfoodIcon />,
    color: '#ef4444',
  },
  {
    categoryName: 'Transporte',
    transactionCount: 12,
    currentSpending: 1400,
    budgetGoal: 1800,
    icon: <DirectionsCarIcon />,
    color: '#0284c7',
  },
  {
    categoryName: 'Lazer',
    transactionCount: 9,
    currentSpending: 1420,
    budgetGoal: 1500,
    icon: <SportsEsportsIcon />,
    color: '#fbbf24',
  },
  {
    categoryName: 'Compras',
    transactionCount: 6,
    currentSpending: 820,
    budgetGoal: 1200,
    icon: <ShoppingBagIcon />,
    color: '#a78bfa',
  },
  {
    categoryName: 'Software',
    transactionCount: 5,
    currentSpending: 340,
    budgetGoal: 500,
    icon: <CodeIcon />,
    color: '#06b6d4',
  },
];
