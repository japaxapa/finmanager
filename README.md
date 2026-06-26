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

* Complex forms
* Validation
* Data visualization
* Server state management
* Authentication
* Error handling
* Scalable architecture

This project was designed specifically to showcase those skills.

---

# Features

* Authentication
* Dashboard
* Income Management
* Expense Management
* Categories
* Tags
* Recurring Transactions
* Reports
* Charts
* Responsive Design

---

# Tech Stack

## React Query

Used for:

* Server state management
* Caching
* Background refetching
* Optimistic updates
* Request deduplication

---

## React Hook Form

Used for:

* High-performance forms
* Minimal re-renders
* Better user experience

---

## Zod

Used for:

* Runtime validation
* Type inference
* Safer forms and API communication

---

## Axios

Used for:

* API communication
* Authentication
* Interceptors
* Error handling

---

## Material UI

Used for:

* Design system
* Accessibility
* Responsive components
* Faster development

---

## React Hot Toast

Used for:

* Success notifications
* Error messages
* Loading feedback

---

## Recharts

Used for:

* Expense reports
* Income reports
* Financial analytics

---

# Installation

```bash
pnpm install
```

Install dependencies:

```bash
pnpm add @tanstack/react-query
pnpm add react-hook-form
pnpm add zod
pnpm add @hookform/resolvers
pnpm add axios
pnpm add @mui/material
pnpm add @emotion/react
pnpm add @emotion/styled
pnpm add react-hot-toast
pnpm add recharts
```

---

# Run the project

```bash
pnpm dev
```

---

# Project Structure

```txt
app/
├── (auth)/
│   ├── confirm/
│   ├── error/
│   ├── forgot-password/
│   ├── login/
│   ├── sign-up/
│   ├── sign-up-success/
│   └── update-password/
├── dashboard/
├── globals.css
├── layout.tsx
└── page.tsx
features/
└── auth/
providers/
└── AppProvider.tsx
└── QueryProvider.tsx
shared/
├── components/
├── hooks/
├── lib/
└── services/
```

---

# What This Project Demonstrates

* TypeScript
* React Architecture
* Feature-Based Structure
* Form Handling
* Validation
* Server State Management
* API Integration
* Data Visualization
* Reusable Components
* Scalability
* Maintainability

---

# Future Improvements

* Budget Planning
* Savings Goals
* Investment Tracking
* Multi-currency Support
* PWA Support
* Offline Mode
* CSV Import/Export
* Dark Mode

---

Built by Mario Kawakita as a portfolio project to demonstrate modern frontend engineering practices.
