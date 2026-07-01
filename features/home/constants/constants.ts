export interface ITechStack {
  title: string;
  subtitle: string;
  reasons: string[];
  provides?: boolean;
}

export const HERO_LIST_ITEMS = [
  'Scalable architecture',
  'Type-safe forms',
  'API communication',
  'State management',
  'Data visualization',
  'Production-ready patterns',
];

export const SCREENSHOT_LIST_ITEMS = [
  'Income and expenses',
  'Categories and tags',
  'Recurring transactions',
  'Financial reports',
  'Responsive design',
];

export const OBJECTIVES_LIST_ITEMS = [
  'Complex forms',
  'Data fetching',
  'Charts and reports',
  'State management',
  'Authentication',
  'Validation',
  'CRUD operations',
];

export const ARCHITECTURE_SHOWCASE = [
  'React Components',
  'React Hook Form',
  'Zod Validation',
  'React Query',
  'Axios',
  'Backend API',
  'Database',
];

export const TECH_STACK_LIST: ITechStack[] = [
  {
    title: 'React Query',
    subtitle:
      'A financial application deals with constantly changing data. A financial application deals with constantly changing data.',
    reasons: [
      'Caching',
      'Background updates',
      'Request deduplication',
      'Loading states',
      'Error handling',
      'Optimistic updates',
    ],
    provides: true,
  },
  {
    title: 'React Hook Form',
    subtitle: 'Financial applications contain many forms.',
    reasons: [
      'Great performance',
      'Minimal re-renders',
      'Easy integration',
      'Better user experience',
    ],
    provides: true,
  },
  {
    title: 'Zod',
    subtitle: 'Money-related applications require strong validation.',
    reasons: ['Run time validation', 'Type inference', 'Safer API communication', 'Shared schemas'],
    provides: true,
  },
  {
    title: 'Axios',
    subtitle: 'A centralized API layer makes the application easier to maintain and scale.',
    reasons: ['Interceptors', 'Authentication', 'Error handling', 'Request cancellation'],
    provides: false,
  },
  {
    title: 'Material UI',
    subtitle: 'Allows me to focus on business logic while maintaining.',
    reasons: [
      'Accessibility',
      'Responsive layouts',
      'Consistent design system',
      'Faster development',
    ],
    provides: false,
  },
  {
    title: 'React Hot Toast',
    subtitle: 'Feedback is critical in CRUD applications.',
    reasons: ['Success messages', 'Error notifications', 'Loading states'],
    provides: false,
  },
  {
    title: 'Recharts',
    subtitle: 'Financial information becomes easier to understand through visualizations.',
    reasons: ['Expense reports', 'Income reports', 'Category analysis', 'Monthly trends'],
    provides: false,
  },
];

export const HOME_CAPACITIES = [
  'TypeScript',
  'Component Design',
  'React Patterns',
  'State Manager',
  'Form Validation',
  'API Integration',
  'Data Visualization',
  'Architecture Decisions',
  'Performance Considerations',
  'Maintainability',
  'Scalability',
];
