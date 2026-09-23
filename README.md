# Finance Tracker

A portfolio project built to demonstrate modern frontend architecture and engineering practices using React and TypeScript.

The goal of this project is not only to create a functional financial management application, but also to showcase how I structure scalable frontend applications using production-ready libraries and patterns.

---

# Live Demo

Coming Soon

---

# Motivation

I wanted to build a project that goes beyond a simple CRUD application and demonstrates skills that companies expect from frontend developers.

A financial application naturally introduces real-world challenges such as:

- Complex forms
- Validation
- Data visualization
- Server state management
- Authentication
- Error handling
- Scalable architecture

This project was designed specifically to showcase those skills.

---

# Features

- Authentication
- Dashboard
- Income Management
- Expense Management
- Categories
- Charts
- Landing Page

---

# Tech Stack

## Next.js (App Router)

Used for:

- File-based routing
- Server / Client component separation
- Middleware & auth protection
- SSR

---

## React Query

Used for:

- Server state management
- Caching
- Background refetching
- Optimistic updates
- Request deduplication

---

## React Hook Form

Used for:

- High-performance forms
- Minimal re-renders
- Better user experience

---

## Zod

Used for:

- Runtime validation
- Type inference
- Safer forms and API communication

---

## Supabase
Used for:
- Authentication (email/password, confirmation, password recovery)
- Postgres database and row-level security
- Generated TypeScript types (`shared/lib/supabase/types`)
- Session refresh via middleware (`shared/lib/supabase/proxy.ts`)

---

## Material UI

Used for:

- Design system
- Accessibility
- Responsive components
- Faster development

---

## React Hot Toast

Used for:

- Success notifications
- Error messages
- Loading feedback

---

## Recharts

Used for:

- Expense reports
- Income reports
- Financial analytics

---

## Tooling

- **pnpm** — package manager
- **ESLint** + **Prettier** — linting & formatting
- **Husky** — Git hooks
- **TypeScript** — end-to-end type safety

---

# Installation

Install dependencies:

```bash
pnpm install
```

---

# Run the development server

```bash
pnpm dev
```

---

# Build for production

```bash
pnpm build
pnpm start
```

---

# Project Structure

The project follows a **feature-based architecture** on top of the Next.js App Router. Routes live in `app/`, business domains live in `features/`, and everything reusable lives in `shared/`.

```
app/
├── accounts/
├── auth/
│   ├── confirm/
│   ├── create-profile/
│   ├── error/
│   ├── forgot-password/
│   ├── login/
│   ├── sign-up/
│   ├── sign-up-success/
│   └── update-password/
├── categories/
├── dashboard/
├── transactions/
├── favicon.ico
├── globals.css
├── layout.tsx
└── page.tsx

features/
├── accounts/          # Account cards, forms, table, metrics
├── auth/              # Login, sign-up, forgot/update password forms
├── categories/        # Category cards, chips, progress, modals
├── dashboard/         # Metrics, graphs (line + pie), transactions preview
├── home/              # Marketing / landing page sections
└── transactions/      # Transactions list, form, modal, metrics

providers/
├── AppProvider.tsx    # Theme, toaster and global providers
└── QueryProvider.tsx  # React Query client

shared/
├── components/
│   ├── Layout/        # Menu, Searchbar, LayoutContainer
│   ├── UI/            # Design system: modals, pickers, buttons, icons
│   ├── Footer.tsx
│   ├── PageBackground.tsx
│   ├── PageContainer.tsx
│   ├── TransactionListManager.tsx
│   └── TransactionRow.tsx
├── constants/         # Form constants and shared config
├── hooks/             # useAccounts, useCategories, useTransactions, ...
├── lib/
│   ├── mock/          # Seed / mock data (CSV, fixtures)
│   ├── supabase/      # Supabase client, proxy (middleware) and generated types
│   ├── mui.theme.ts   # MUI theme
│   ├── toaster.tsx    # Toast configuration
│   ├── tsquery.ts     # React Query helpers
│   └── utils.ts
├── services/          # API layer: accounts, categories, dashboard, transactions, user
└── utils/             # Generic utilities
```

## Layers

- **`app/`** — Routing only. Each route composes a feature and wraps it in a layout. Route groups like `auth/` keep authentication pages isolated from the app shell.
- **`features/`** — One folder per business domain. Each feature owns its components, forms, types and mock data, and consumes data through `shared/hooks` + `shared/services`.
- **`providers/`** — Global context (theme, toaster, React Query client).
- **`shared/`** — Cross-cutting concerns: the UI design system, layout shell, API services, hooks, Supabase client and utilities.

---

# What This Project Demonstrates

- Next.js App Router
- TypeScript
- React Architecture
- Feature-Based Structure
- Form Handling
- Validation
- Server State Management
- API Integration
- Data Visualization
- Reusable Components
- Scalability
- Maintainability

---

# Future Improvements

- Budget Planning
- Savings Goals
- Investment Tracking
- Multi-currency Support
- PWA Support
- Offline Mode
- CSV Import/Export

---

Built by Mario Kawakita as a portfolio project to demonstrate modern frontend engineering practices.
