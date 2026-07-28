// --- Mock Data ---
export const METRIC_DATA = [
  {
    title: 'SALDO TOTAL',
    amount: 'R$ 42.980,00',
    trendPercentage: 12.4,
    trendType: 'up' as const,
    icon: 'wallet',
  },
  {
    title: 'RECEITAS (MÊS)',
    amount: 'R$ 18.400,00',
    trendPercentage: 8.1,
    trendType: 'up' as const,
    icon: 'income',
  },
  {
    title: 'DESPESAS (MÊS)',
    amount: 'R$ 9.120,00',
    trendPercentage: -3.2,
    trendType: 'down' as const,
    icon: 'expense',
  },
  {
    title: 'ECONOMIA',
    amount: 'R$ 9.280,00',
    trendPercentage: 21.0,
    trendType: 'up' as const,
    icon: 'savings',
  },
];

export const CATEGORY_BREAKDOWN = [
  { name: 'Moradia', amount: 'R$ 3.200', color: '#3B82F6' },
  { name: 'Alimentação', amount: 'R$ 2.100', color: '#22C55E' },
  { name: 'Transporte', amount: 'R$ 1.400', color: '#06B6D4' },
  { name: 'Lazer', amount: 'R$ 1.420', color: '#EAB308' },
  { name: 'Outros', amount: 'R$ 1.000', color: '#A855F7' },
];

export const RECENT_TRANSACTIONS = [
  {
    title: 'Salário — Acme Inc.',
    date: '02 dez',
    category: 'Receita',
    amount: 12000.0,
    type: 'income' as const,
  },
  {
    title: 'Aluguel',
    date: '05 dez',
    category: 'Moradia',
    amount: 2400.0,
    type: 'expense' as const,
  },
  {
    title: 'Supermercado Pão',
    date: '06 dez',
    category: 'Alimentação',
    amount: 486.2,
    type: 'expense' as const,
  },
  {
    title: 'Freelance — Landing page',
    date: '08 dez',
    category: 'Receita',
    amount: 3200.0,
    type: 'income' as const,
  },
  {
    title: 'Assinatura Vercel',
    date: '10 dez',
    category: 'Software',
    amount: 120.0,
    type: 'expense' as const,
  },
];
