# 🪵 Ambika Krupa Furniture

> A modern, full-stack e-commerce platform for custom furniture and carpentry services. Built with React, TypeScript, Express, and PostgreSQL.

![Ambika Krupa Furniture](https://img.shields.io/badge/Ambika Krupa Furniture-v1.0.0-brown?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue?style=for-the-badge&logo=postgresql)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Development](#development)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

Ambika Krupa Furniture is a comprehensive e-commerce solution designed specifically for furniture businesses and carpentry services. It provides a seamless experience for customers to browse products, request custom furniture quotes, view project galleries, and manage inquiries. The platform includes a powerful admin dashboard for managing products, inquiries, contacts, and project portfolios.

### Key Highlights

- **Modern UI/UX**: Beautiful, responsive design with smooth animations and intuitive navigation
- **Custom Furniture Requests**: Comprehensive inquiry system for custom furniture projects
- **Project Gallery**: Showcase completed projects with detailed descriptions
- **Admin Dashboard**: Full-featured dashboard for managing business operations
- **Product Management**: Complete product catalog with categories, filtering, and search
- **Contact Management**: Integrated contact form and inquiry tracking system

## ✨ Features

### Customer-Facing Features

- 🏠 **Landing Page**: Attractive hero section with featured products and projects
- 🛍️ **Product Catalog**: Browse furniture with advanced filtering (category, price, search)
- 🎨 **Custom Furniture Requests**: Submit detailed custom furniture inquiries
- 📸 **Project Gallery**: View completed projects and portfolio
- 📞 **Contact Form**: Easy-to-use contact form for inquiries
- 📱 **Responsive Design**: Fully responsive across all devices
- 🔍 **Advanced Search**: Search products by name, description, or category
- 🎯 **Product Details**: Detailed product pages with specifications

### Admin Features

- 📊 **Dashboard**: Overview of inquiries, contacts, and business metrics
- 📦 **Product Management**: Add, edit, and manage products
- 📋 **Inquiry Management**: Track and manage custom furniture inquiries
- 💬 **Contact Management**: View and respond to customer contacts
- 🖼️ **Gallery Management**: Manage project gallery and portfolio
- 📈 **Analytics**: View statistics and insights

### Technical Features

- 🔐 **Firebase Authentication**: Secure user authentication
- 🗄️ **PostgreSQL Database**: Robust database with Drizzle ORM
- 🚀 **RESTful API**: Clean API architecture
- 🎨 **Tailwind CSS**: Modern styling with utility-first CSS
- 🧩 **Component Library**: Reusable UI components (Radix UI)
- ⚡ **Fast Performance**: Optimized with React Query for data fetching
- 📦 **Type Safety**: Full TypeScript support

## 🛠️ Tech Stack

### Frontend

- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Wouter** - Lightweight routing
- **TanStack React Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Firebase** - Authentication

### Backend

- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Drizzle ORM** - TypeScript ORM
- **PostgreSQL** - Database
- **Firebase Admin** - Server-side Firebase
- **Zod** - Schema validation
- **Axios** - HTTP client

### Development Tools

- **ESBuild** - Fast bundler
- **Concurrently** - Run multiple commands
- **TSX** - TypeScript execution
- **Drizzle Kit** - Database migrations

## 📁 Project Structure

```
Ambika Krupa Furniture/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── ui/        # Reusable UI components
│   │   │   └── ...        # Feature components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility libraries
│   │   └── utils/         # Helper functions
│   ├── db/                # Database schema files
│   └── index.html         # HTML template
├── server/                 # Backend application
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   ├── db.ts              # Database connection
│   ├── firebaseAdmin.ts   # Firebase Admin setup
│   └── index.ts           # Server entry point
├── shared/                 # Shared code
│   └── schema.ts          # Database schema (Drizzle)
├── dist/                   # Build output
├── package.json           # Dependencies
├── vite.config.ts         # Vite configuration
├── drizzle.config.ts      # Drizzle configuration
└── tsconfig.json          # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn**
- **Firebase Project** (for authentication)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/Ambika Krupa Furniture.git
cd Ambika Krupa Furniture
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables** (see [Environment Variables](#environment-variables))

4. **Set up the database** (see [Database Setup](#database-setup))

5. **Start the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database
PGHOST=your-postgres-host
PGPORT=5432
PGUSER=your-postgres-user
PGPASSWORD=your-postgres-password
PGDATABASE=your-database-name

# Firebase Configuration (Client)
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id

# Firebase Admin (Server)
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_PRIVATE_KEY=your-firebase-private-key

# Server
PORT=5000
NODE_ENV=development
```

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password and Google)
3. Download the service account key and save it as `server/serviceAccountKey.json`
4. Copy the Firebase configuration to your `.env` file

## 🗄️ Database Setup

### Option 1: Using Drizzle (Recommended)

The project uses Drizzle ORM for database management. The schema is defined in `shared/schema.ts`.

```bash
# Push schema to database
npx drizzle-kit push

# Generate migrations
npx drizzle-kit generate

# Run migrations
npx drizzle-kit migrate
```

### Option 2: Using SQL Scripts

You can also use the provided SQL scripts:

```bash
# Connect to PostgreSQL
psql -h your-host -U your-username -d your-database

# Run the schema script
\i client/db/database_schema.sql
```

For detailed database setup instructions, see [client/db/database_setup_guide.md](client/db/database_setup_guide.md)

## 💻 Development

### Available Scripts

```bash
# Start development server (frontend + backend)
npm run dev

# Start backend server only
npm run server:dev

# Build for production
npm run build

# Start production server
npm start
```

### Development Workflow

1. **Frontend Development**: The frontend runs on Vite dev server with hot module replacement
2. **Backend Development**: The backend runs with `tsx watch` for auto-reloading
3. **Database Changes**: Use Drizzle Kit to manage schema changes
4. **Type Safety**: TypeScript ensures type safety across the entire codebase

### Code Structure

- **Components**: Reusable UI components in `client/src/components/`
- **Pages**: Page components in `client/src/pages/`
- **API Routes**: Backend routes in `server/routes.ts`
- **Database Operations**: Database logic in `server/storage.ts`
- **Schema**: Shared schema in `shared/schema.ts`

## 🔌 API Endpoints

### Public Endpoints

```
GET    /api/user/categories          # Get all categories
GET    /api/user/products            # Get all products
GET    /api/user/products/:id        # Get product by ID
GET    /api/user/projects            # Get all projects
GET    /api/about                    # Get about section
POST   /api/user/inquiries           # Create inquiry
POST   /api/user/contacts            # Create contact
```

### Query Parameters

- `?featured=true` - Get featured items
- `?categoryId=xxx` - Filter by category

### Example Requests

```bash
# Get all products
curl http://localhost:5000/api/user/products

# Get featured products
curl http://localhost:5000/api/user/products?featured=true

# Create inquiry
curl -X POST http://localhost:5000/api/user/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "projectType": "custom_furniture",
    "budgetRange": "50000-100000"
  }'
```

## 🔑 Authentication

The application uses Firebase Authentication for user authentication.

### Setup

1. Enable Firebase Authentication in Firebase Console
2. Configure sign-in methods (Email/Password, Google)
3. Add Firebase configuration to environment variables

### Usage

- **Client-side**: Firebase Auth SDK handles authentication
- **Server-side**: Firebase Admin SDK verifies tokens
- **Protected Routes**: Admin routes require authentication

## 🚢 Deployment

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Deployment Options

- **Vercel**: Deploy frontend and serverless functions
- **Railway**: Full-stack deployment
- **Heroku**: Traditional hosting
- **AWS/GCP**: Cloud deployment
- **Docker**: Containerized deployment

### Environment Variables

Make sure to set all environment variables in your deployment platform.

### Database

- Use a managed PostgreSQL service (Neon, Supabase, AWS RDS)
- Set up database backups
- Configure connection pooling

## 📝 Database Schema

The database includes the following main tables:

- **users** - User accounts
- **categories** - Product categories
- **products** - Product catalog
- **projects** - Gallery projects
- **inquiries** - Custom furniture inquiries
- **contacts** - Contact form submissions
- **about_sections** - About page content

For detailed schema information, see `client/db/database_schema.sql` or `shared/schema.ts`.

## 🎨 UI Components

The project uses a custom UI component library based on Radix UI and Tailwind CSS. Components include:

- Buttons, Cards, Badges
- Forms, Inputs, Selects
- Dialogs, Modals, Dropdowns
- Navigation, Tabs, Accordions
- And more...

All components are located in `client/src/components/ui/`.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow ESLint rules
- Write meaningful commit messages
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Drizzle ORM](https://orm.drizzle.team/) - Database ORM
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - Component library
- [Firebase](https://firebase.google.com/) - Authentication and hosting

## 📞 Support

For support, email support@Ambika Krupa Furniture.com or open an issue in the repository.

## 🔗 Links

- [Documentation](./docs)
- [API Documentation](./docs/api.md)
- [Database Guide](./client/db/database_setup_guide.md)
- [Contributing Guide](./CONTRIBUTING.md)

---

Made with ❤️ by the Ambika Krupa Furniture team

