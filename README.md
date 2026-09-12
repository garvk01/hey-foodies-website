# Hey Foodies — Restaurant Web Application

**Live Website:** https://www.heyfood.co.in

---

## Table of Contents

- [About the Project](#about-the-project)
- [Project Goals](#project-goals)
- [Features](#features)
- [Customer Features](#customer-features)
- [Admin Features](#admin-features)
- [Pages and Routes](#pages-and-routes)
- [Technology Stack](#technology-stack)
- [Application Architecture](#application-architecture)
- [Project Structure](#project-structure)
- [Frontend Architecture](#frontend-architecture)
- [Backend and Database](#backend-and-database)
- [Database Tables](#database-tables)
- [Authentication and Authorization](#authentication-and-authorization)
- [Row Level Security](#row-level-security)
- [Supabase Storage](#supabase-storage)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Development](#development)
- [Production Build](#production-build)
- [Deployment](#deployment)
- [Git Workflow](#git-workflow)
- [Image and Static Asset Management](#image-and-static-asset-management)
- [Responsive Design](#responsive-design)
- [Code Organization](#code-organization)
- [Content Management](#content-management)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Development Guidelines](#development-guidelines)
- [Future Improvements](#future-improvements)
- [License](#license)
- [Contact](#contact)

---

## About the Project

Hey Foodies is a modern, responsive restaurant web application designed to provide customers with an easy digital experience for discovering the restaurant, browsing the menu, viewing offers and gallery images, submitting reservation requests, and finding contact and location information.

The application also includes a protected administration area for authorized users to manage restaurant content and operational information.

The frontend is built with React and TypeScript using TanStack Start and TanStack Router. Supabase provides the database, authentication, storage, and access-control layer.

---

## Project Goals

The main goals of the application are to:

- Provide a professional online presence for the restaurant.
- Make the restaurant menu easy to browse.
- Present food and restaurant content in an attractive interface.
- Provide a responsive experience across desktop and mobile devices.
- Allow customers to submit reservation requests.
- Provide convenient restaurant contact and location information.
- Allow authorized administrators to manage restaurant content.
- Store dynamic restaurant information in a centralized database.
- Protect administrative functionality with authentication and role-based authorization.

---

# Features

## Customer Features

### Homepage

The homepage provides an overview of the restaurant and includes:

- Hero section
- Featured/favourite food items
- Special offers
- Restaurant story
- Gallery preview
- Location information
- Contact information
- Navigation to important pages

### Menu

Customers can browse food items organized into menu categories.

Menu information includes:

- Category names
- Item names
- Descriptions
- Prices
- Featured status
- Availability status

### About

The About page provides information about the restaurant and its story.

### Gallery

The Gallery page displays restaurant and food images.

### Reservations

Customers can submit reservation requests using a reservation form.

Reservation information includes:

- Name
- Phone number
- Date
- Time
- Number of guests
- Additional notes

### Contact

The Contact page provides restaurant contact and location information and allows customers to submit messages.

### Responsive Interface

The website is designed for:

- Desktop computers
- Laptops
- Tablets
- Mobile phones

---

# Admin Features

The application includes a protected administration area for authorized users.

Administrative functionality includes management of:

- Menu categories
- Menu items
- Menu prices
- Menu availability
- Featured menu items
- Special offers
- Opening hours
- Restaurant/site settings
- Gallery images
- Reservation requests
- Contact messages

Administrative routes are protected through authentication and role-based authorization.

---

# Pages and Routes

The application uses TanStack Router.

| Route | Description | Access |
|---|---|---|
| `/` | Restaurant homepage | Public |
| `/about` | Restaurant information | Public |
| `/menu` | Restaurant menu | Public |
| `/gallery` | Food and restaurant gallery | Public |
| `/contact` | Contact information and contact form | Public |
| `/reservations` | Reservation request form | Public |
| `/auth` | Authentication | Public |
| `/admin` | Administration dashboard | Protected |

Protected route files are organized under:

```text
src/routes/_authenticated/
```

---

# Technology Stack

## Frontend

- React
- TypeScript
- TanStack Start
- TanStack Router
- Vite
- Tailwind CSS
- Lucide React

## Backend

- Supabase
- PostgreSQL
- Supabase Authentication
- Supabase Storage
- PostgreSQL Row Level Security

## Development

- Node.js
- npm
- Git
- GitHub
- Visual Studio Code

## Deployment

- Vercel

---

# Application Architecture

```text
                         ┌─────────────────────┐
                         │      Customer       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    Web Frontend     │
                         │                     │
                         │ React + TypeScript  │
                         │ TanStack Start      │
                         │ TanStack Router     │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
          ┌─────────────────────┐       ┌─────────────────────┐
          │   Public Routes     │       │   Authentication    │
          │                     │       │                     │
          │ Home                │       │ Supabase Auth       │
          │ About               │       │                     │
          │ Menu                │       └──────────┬──────────┘
          │ Gallery             │                  │
          │ Contact             │                  ▼
          │ Reservations        │       ┌─────────────────────┐
          └──────────┬──────────┘       │  Admin Dashboard    │
                     │                  │  Protected Routes   │
                     │                  └──────────┬──────────┘
                     │                             │
                     └──────────────┬──────────────┘
                                    ▼
                         ┌─────────────────────┐
                         │      Supabase       │
                         │                     │
                         │ PostgreSQL          │
                         │ Authentication      │
                         │ Storage             │
                         │ RLS Policies        │
                         └─────────────────────┘
```

---

# Project Structure

```text
HeyFoodies/
│
├── public/
│   ├── favicon.png
│   ├── interior.png
│   ├── pasta-photo.png
│   ├── pizza.png
│   ├── robots.txt
│   ├── shake.png
│   └── veg-burger-hero.png
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── home/
│   │   │   ├── Favourites.tsx
│   │   │   ├── GalleryStrip.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Location.tsx
│   │   │   ├── Offers.tsx
│   │   │   └── Story.tsx
│   │   ├── ui/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── PageHero.tsx
│   │   └── Reveal.tsx
│   │
│   ├── hooks/
│   │   └── use-mobile.tsx
│   │
│   ├── integrations/
│   │   └── supabase/
│   │       ├── auth-attacher.ts
│   │       ├── auth-middleware.ts
│   │       ├── client.server.ts
│   │       ├── client.ts
│   │       └── types.ts
│   │
│   ├── lib/
│   │   ├── admin.functions.ts
│   │   ├── content.functions.ts
│   │   ├── content.ts
│   │   ├── error-capture.ts
│   │   ├── error-page.ts
│   │   ├── forms.functions.ts
│   │   ├── public-supabase.server.ts
│   │   ├── site.ts
│   │   └── utils.ts
│   │
│   ├── routes/
│   │   ├── _authenticated/
│   │   │   ├── admin.tsx
│   │   │   └── route.tsx
│   │   ├── about.tsx
│   │   ├── auth.tsx
│   │   ├── contact.tsx
│   │   ├── gallery.tsx
│   │   ├── index.tsx
│   │   ├── menu.tsx
│   │   ├── README.md
│   │   ├── reservations.tsx
│   │   └── __root.tsx
│   │
│   ├── router.tsx
│   ├── routeTree.gen.ts
│   ├── server.ts
│   ├── start.ts
│   └── styles.css
│
├── supabase/
│   ├── migrations/
│   └── config.toml
│
├── .env
├── .gitignore
├── .prettierignore
├── .prettierrc
├── AGENTS.md
├── bun.lock
├── bunfig.toml
├── components.json
├── eslint.config.js
├── package.json
└── README.md
```

> Generated/dependency directories such as `node_modules/`, `.output/`, and `.wrangler/` are not intended to be committed.

---

# Frontend Architecture

## Components

Reusable components are located in:

```text
src/components/
```

Shared layout components include:

```text
Header.tsx
Footer.tsx
PageHero.tsx
Reveal.tsx
```

## Homepage Components

Homepage-specific sections are organized under:

```text
src/components/home/
```

including:

- `Hero.tsx`
- `Favourites.tsx`
- `Offers.tsx`
- `Story.tsx`
- `GalleryStrip.tsx`
- `Location.tsx`

## UI Components

Reusable UI primitives are located in:

```text
src/components/ui/
```

These include components for:

- Buttons
- Cards
- Forms
- Dialogs
- Tables
- Inputs
- Navigation
- Tabs
- Alerts
- Menus
- Tooltips
- Other interface elements

---

# Backend and Database

Supabase provides the backend services used by the application.

The project uses Supabase for:

- PostgreSQL database
- Authentication
- User roles
- Restaurant content
- Reservations
- Contact messages
- Gallery image storage
- Row Level Security

Supabase integration code is primarily located in:

```text
src/integrations/supabase/
```

Application database/server functions are located in:

```text
src/lib/
```

Database migrations are stored in:

```text
supabase/migrations/
```

---

# Database Tables

## `user_roles`

Stores application roles associated with authenticated users.

Supported roles:

```text
admin
staff
```

---

## `site_settings`

Stores general restaurant and website information such as:

- Restaurant name
- Tagline
- Phone
- WhatsApp
- Email
- Address
- Maps link
- Social media information

---

## `opening_hours`

Stores restaurant opening-hour information, including:

- Day
- Day index
- Opening time
- Closing time
- Closed status

---

## `menu_categories`

Stores menu categories.

Typical fields include:

- Category ID
- Slug
- Name
- Description/blurb
- Sort order
- Creation timestamp

---

## `menu_items`

Stores individual food items.

Typical fields include:

- Item ID
- Category ID
- Name
- Description
- Price
- Featured status
- Availability status
- Sort order
- Creation timestamp

Each menu item is associated with a menu category.

---

## `offers`

Stores promotional offers displayed on the website.

Information includes:

- Offer title
- Details
- Notes
- Active status
- Sort order
- Creation timestamp

---

## `reservations`

Stores reservation requests submitted by customers.

Information includes:

- Customer name
- Phone number
- Date
- Time
- Number of guests
- Notes
- Reservation status

---

## `contact_messages`

Stores messages submitted through the contact page.

Information includes:

- Name
- Email
- Phone
- Message
- Handled status
- Creation timestamp

---

## `gallery_images`

Stores gallery image information.

Information includes:

- Image URL
- Storage path
- Caption
- Display orientation
- Sort order
- Creation timestamp
- Updated timestamp

---

# Authentication and Authorization

Authentication is handled through Supabase Authentication.

The general flow is:

```text
User
  │
  ▼
Authentication Page
  │
  ▼
Supabase Authentication
  │
  ▼
Authenticated User
  │
  ▼
Application Role Check
  │
  ├── Authorized ──► Protected Application
  │
  └── Unauthorized ─► Access Restricted
```

The authentication identity is managed by Supabase Auth.

Application authorization is handled separately using the `user_roles` table.

---

# Row Level Security

PostgreSQL Row Level Security (RLS) is used to protect database records and operations.

RLS helps ensure that:

- Public users can access only publicly available data.
- Authenticated users receive access according to their permissions.
- Administrative operations require the appropriate role.
- Frontend restrictions are backed by database-level security.

Database authorization should not rely solely on hiding buttons or pages in the frontend.

---

# Supabase Storage

Supabase Storage is used for gallery image management.

An image can have:

- A stored file
- A storage path
- A public URL
- A database record
- A caption
- A display order

Storage access should be controlled using appropriate Supabase Storage policies.

---

# Environment Variables

Create a `.env` file in the root directory.

Example:

```env
SUPABASE_PROJECT_ID="your-project-id"
SUPABASE_PUBLISHABLE_KEY="your-publishable-key"
SUPABASE_URL="https://your-project-id.supabase.co"

VITE_SUPABASE_PROJECT_ID="your-project-id"
VITE_SUPABASE_PUBLISHABLE_KEY="your-publishable-key"
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
```

## Variable Reference

| Variable | Purpose |
|---|---|
| `SUPABASE_PROJECT_ID` | Supabase project identifier |
| `SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key |
| `SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_PROJECT_ID` | Client-side Supabase project identifier |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Client-side publishable key |
| `VITE_SUPABASE_URL` | Client-side Supabase URL |

### Security

Never commit `.env` or private credentials to GitHub.

Never expose:

- Service-role keys
- Database passwords
- Private API keys
- Server-only secrets

---

# Getting Started

## Prerequisites

Install the following before running the project:

- Node.js
- npm
- Git

You also need access to the required Supabase project and environment variables.

---

# Installation

### 1. Clone the Repository

```bash
git clone https://github.com/heyfoodiesjgd-lgtm/HeyFoodies.git
```

### 2. Enter the Project

```bash
cd HeyFoodies
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root and add the required Supabase variables.

---

# Development

Start the development server:

```bash
npm run dev
```

The terminal will display the local development URL.

Open that URL in your browser.

---

# Production Build

Create a production build:

```bash
npm run build
```

If a production start script is available in `package.json`, run:

```bash
npm run start
```

---

# Deployment

The production website is deployed using Vercel.

## Deployment Flow

```text
Local Development
       │
       ▼
      Git
       │
       ▼
    GitHub
       │
       ▼
    Vercel
       │
       ▼
 Production
       │
       ▼
https://www.heyfood.co.in
```

## Deploying Changes

After testing changes locally:

```bash
git status
git add .
git commit -m "Describe your changes"
git push origin main
```

The `main` branch is used for the production deployment workflow.

---

# Git Workflow

Recommended workflow:

```text
1. Make changes
       ↓
2. Run development server
       ↓
3. Test changes
       ↓
4. Run production build
       ↓
5. Check Git status
       ↓
6. Commit
       ↓
7. Push to GitHub
       ↓
8. Verify production deployment
```

Useful commands:

```bash
git status
git log --oneline
git add .
git commit -m "Your commit message"
git push origin main
```

---

# Image and Static Asset Management

Static images intended to be served directly by the website are stored in:

```text
public/
```

For example:

```text
public/
├── favicon.png
├── interior.png
├── pasta-photo.png
├── pizza.png
├── shake.png
└── veg-burger-hero.png
```

Images in `public/` should be referenced using root-relative paths.

Correct:

```tsx
<img src="/pizza.png" alt="Pizza" />
```

Incorrect:

```tsx
<img src="/public/pizza.png" alt="Pizza" />
```

---

# Responsive Design

The application is designed to support:

- Desktop screens
- Laptop screens
- Tablets
- Mobile phones

Responsive behavior is implemented through the application's styling and responsive components.

The project also includes:

```text
src/hooks/use-mobile.tsx
```

for mobile-related behavior.

UI changes should be tested at multiple viewport sizes.

---

# Code Organization

| Directory | Purpose |
|---|---|
| `src/components/` | Reusable React components |
| `src/components/home/` | Homepage sections |
| `src/components/ui/` | Reusable UI components |
| `src/hooks/` | React hooks |
| `src/integrations/supabase/` | Supabase clients and authentication integration |
| `src/lib/` | Application utilities and server functions |
| `src/routes/` | Application routes |
| `src/routes/_authenticated/` | Protected routes |
| `public/` | Public static assets |
| `supabase/migrations/` | Database migrations |

---

# Content Management

Dynamic restaurant information is stored in the backend where appropriate.

Content includes:

- Restaurant information
- Opening hours
- Menu categories
- Menu items
- Prices
- Availability
- Featured items
- Offers
- Reservations
- Contact messages
- Gallery information

This allows restaurant content to be updated without requiring every content change to be hard-coded into individual frontend pages.

---

# Security

The application uses multiple security layers.

## Authentication

Supabase Authentication handles user sign-in and identity management.

## Authorization

Application roles control access to administrative functionality.

## Database Security

PostgreSQL Row Level Security protects database operations.

## Protected Routes

Administrative routes are located under:

```text
src/routes/_authenticated/
```

## Environment Configuration

Sensitive configuration should be stored in environment variables rather than source code.

## Storage Security

Supabase Storage policies control access to stored files.

---

# Performance and Reliability

The project is structured around:

- Component-based UI
- Reusable components
- Server-aware application architecture
- Database-backed dynamic content
- Responsive layouts
- Static asset serving
- Environment-based configuration
- Database-level access control

Before deploying significant changes, run:

```bash
npm run build
```

and resolve build errors before pushing to production.

---

# Troubleshooting

## Dependencies Are Missing

Run:

```bash
npm install
```

If necessary, reinstall dependencies.

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

---

## Development Server Does Not Start

Check:

- Node.js installation
- Installed dependencies
- `.env` configuration
- Supabase environment variables
- Terminal error messages

Then run:

```bash
npm run dev
```

---

## Production Build Fails

Run:

```bash
npm run build
```

Inspect the first error reported by the terminal.

Fix build errors before deployment.

---

## Supabase Connection Problems

Check:

1. Supabase project URL.
2. Publishable key.
3. Environment variable names.
4. Environment variables configured in Vercel.
5. Supabase project status.
6. Authentication configuration.
7. RLS policies.

---

## Admin Access Problems

Check:

1. The user exists in Supabase Authentication.
2. The user has successfully authenticated.
3. The authenticated user's UUID exists in `user_roles`.
4. The correct role is assigned.
5. Relevant RLS policies allow the operation.

---

## Images Are Not Loading

For images inside `public/`, verify:

- The filename is correct.
- The file exists in `public/`.
- The URL begins with `/`.

Example:

```tsx
<img src="/interior.png" alt="Restaurant interior" />
```

For Supabase Storage images, verify:

- Storage bucket
- Storage path
- Public URL
- Storage policies
- Database image record

---

# Development Guidelines

When modifying the application:

### 1. Keep Components Reusable

Prefer reusable components over duplicated code.

### 2. Protect Database Operations

Do not bypass existing authentication and RLS mechanisms.

### 3. Keep Secrets Private

Never commit private credentials.

### 4. Test Desktop and Mobile

Check UI changes at multiple viewport sizes.

### 5. Test Before Pushing

Run:

```bash
npm run dev
```

and:

```bash
npm run build
```

### 6. Use Meaningful Commit Messages

Good:

```bash
git commit -m "Update menu item pricing"
```

Avoid vague messages such as:

```bash
git commit -m "changes"
```

### 7. Verify Production

After deployment, verify:

- Homepage
- Menu
- Gallery
- About page
- Contact page
- Reservation page
- Authentication
- Admin dashboard
- Mobile layout
- Images
- Database-backed content

---

# Future Improvements

Potential future improvements include:

- Online food ordering
- Shopping cart
- Online payment integration
- Order management
- Order tracking
- Customer accounts
- Reservation confirmation notifications
- Customer reviews
- Coupon and promotional codes
- Admin analytics
- Menu search and filtering
- Image optimization
- Advanced SEO
- Performance monitoring
- Progressive Web App support
- Automated monitoring and backups

These are potential future enhancements and are not necessarily part of the current production implementation.

---

# Project Status

The application is deployed and available at:

**https://www.heyfood.co.in**

Source code:

**https://github.com/heyfoodiesjgd-lgtm/HeyFoodies**

---

# License

This project is intended for the Hey Foodies restaurant website.

Restaurant-specific branding, photographs, menu information, business information, and other proprietary content belong to their respective owners.

Third-party libraries and frameworks used by the project are subject to their respective licenses.

---

# Contact

For restaurant-related information, visit:

**https://www.heyfood.co.in**

---

# Quick Start

```bash
git clone https://github.com/heyfoodiesjgd-lgtm/HeyFoodies.git
cd HeyFoodies
npm install
```

Create the `.env` file with the required Supabase configuration and then run:

```bash
npm run dev
```

For a production build:

```bash
npm run build
```

---

## Production Website

**https://www.heyfood.co.in**
