# 🛒 Advanced Full-Stack E-Commerce Platform

A production-ready, feature-rich e-commerce platform built with the MERN stack, featuring advanced payment integration, cloud storage, real-time updates, and enterprise-grade architecture. This platform demonstrates modern full-stack development with cutting-edge technologies and best practices.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF)
![Appwrite](https://img.shields.io/badge/Appwrite-FD366E?style=for-the-badge&logo=appwrite&logoColor=white)

## 🚀 Live Demo

- **🛍️ Customer Store**: [http://localhost:5050](http://localhost:5050)
- **⚡ Admin Dashboard**: [http://localhost:5050/admin](http://localhost:5050/admin)

## ✨ Key Features

### 🛍️ Customer Experience

- **Modern Shopping Interface** - Clean, responsive design with dark/light mode support
- **Advanced Product Catalog** - Browse products with filtering, search, and pagination
- **Smart Shopping Cart** - Real-time cart management with persistent storage
- **Secure Payment Gateway** - Integrated Razorpay with multiple payment options (Cards, UPI, Wallets, Net Banking)
- **Real-time Order Tracking** - Live order status updates with payment confirmation
- **JWT Authentication** - Secure user registration, login, and session management
- **Responsive Design** - Seamless experience across all devices and screen sizes

### ⚡ Admin Dashboard

- **Real-time Analytics Dashboard** - Dynamic metrics with animated counters using CountUp.js
- **Advanced Product Management** - Full CRUD operations with cloud image upload via Appwrite
- **Sophisticated File Handling** - Custom busboy implementation for robust multipart data processing
- **Order Management System** - Complete order lifecycle with status updates and payment tracking
- **Inventory Control** - Stock tracking, low-inventory alerts, and automated management
- **Sales Analytics** - Revenue tracking, customer insights, and performance metrics
- **Optimistic UI Updates** - Instant feedback with automatic rollback on errors
- **Error Boundaries** - Graceful error handling with custom error pages and recovery

### 🏗️ Advanced Technical Architecture

- **Microservices Design** - Separate frontend applications for optimal scalability
- **Cloud-First Storage** - Appwrite integration for reliable file storage and CDN delivery
- **Payment Processing** - Production-ready Razorpay integration with webhook verification
- **Custom Upload Middleware** - Ditched traditional multer for custom busboy implementation
- **Advanced State Management** - Context API with optimistic updates and error recovery
- **Performance Engineering** - Code splitting, lazy loading, and advanced caching strategies
- **Security-First Design** - JWT tokens, protected routes, input validation, and CORS configuration

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Customer App  │    │   Admin Panel   │    │   Backend API   │
│   (React/Vite)  │    │   (React/Vite)  │    │ (Node.js/Express)│
│                 │    │                 │    │                 │
│ • Product Browse│    │ • Dashboard     │    │ • Authentication│
│ • Shopping Cart │    │ • Product CRUD  │    │ • Product API   │
│ • Checkout      │    │ • Order Mgmt    │    │ • Order API     │
│ • User Profile  │    │ • Analytics     │    │ • Payment API   │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────┴───────────┐
                    │      MongoDB Atlas      │
                    │                         │
                    │ • Users Collection      │
                    │ • Products Collection   │
                    │ • Orders Collection     │
                    │ • Sessions Collection   │
                    └─────────────────────────┘
```

## 🛠️ Technology Stack

### Frontend

- **React 18** - Modern React with hooks and context API
- **Vite** - Lightning-fast build tool with HMR
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing with protected routes
- **React Toastify** - Elegant notifications and user feedback
- **CountUp.js** - Animated number counters for analytics

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimalist web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **Multer** - File upload handling for product images
- **Morgan** - HTTP request logging middleware
- **CORS** - Cross-origin resource sharing configuration

### DevOps & Tools

- **ESLint** - Code linting and formatting
- **Git** - Version control with clean commit history
- **npm** - Package management and scripts
- **Postman** - API testing and documentation

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd e-Commerce
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   # Customer app
   cd ../e-commerce
   npm install

   # Admin app
   cd ../admin
   npm install
   ```

4. **Environment Configuration**

   ```bash
   # Create .env in server directory
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   PORT=5050
   ```

5. **Build frontend applications**

   ```bash
   # Build customer app
   cd e-commerce
   npm run build

   # Build admin app
   cd ../admin
   npm run build
   ```

6. **Start the application**
   ```bash
   cd ../server
   npm start
   ```

### Development Mode

For development with hot reloading:

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Customer App
cd e-commerce
npm run dev

# Terminal 3 - Admin App
cd admin
npm run dev
```

## 📁 Project Structure

```
e-Commerce/
├── 📁 server/                  # Backend API
│   ├── 📁 routes/             # API route handlers
│   │   ├── auth.routes.js     # Authentication routes
│   │   ├── product.routes.js  # Product CRUD operations
│   │   ├── order.routes.js    # Order management
│   │   └── admin.auth.routes.js # Admin authentication
│   ├── 📁 models/             # MongoDB schemas
│   ├── 📁 middleware/         # Custom middleware
│   ├── 📁 lib/               # Database connection
│   ├── 📁 public/            # Static file uploads
│   └── index.js              # Server entry point
│
├── 📁 e-commerce/             # Customer Frontend
│   ├── 📁 src/
│   │   ├── 📁 components/     # Reusable UI components
│   │   ├── 📁 pages/          # Route pages
│   │   ├── 📁 context/        # React Context providers
│   │   ├── 📁 hooks/          # Custom React hooks
│   │   └── App.jsx           # Main app component
│   ├── 📁 dist/              # Production build
│   └── vite.config.js        # Vite configuration
│
└── 📁 admin/                  # Admin Dashboard
    ├── 📁 src/
    │   ├── 📁 components/     # Admin UI components
    │   │   ├── PrivateRoute.jsx # Route protection
    │   │   ├── UpdateModal.jsx  # Product edit modal
    │   │   └── Sidebar.jsx     # Navigation sidebar
    │   ├── 📁 pages/          # Admin pages
    │   │   ├── Dashboard.jsx   # Analytics dashboard
    │   │   ├── Product.jsx     # Product management
    │   │   ├── Order.jsx       # Order management
    │   │   └── Login.jsx       # Admin authentication
    │   ├── 📁 context/        # State management
    │   │   ├── product/       # Product context
    │   │   └── order/         # Order context
    │   ├── 📁 hooks/          # Custom admin hooks
    │   │   ├── useUpdateProduct.jsx
    │   │   ├── useDeleteProduct.jsx
    │   │   └── useCheckhealth.jsx
    │   └── App.jsx           # Admin app component
    ├── 📁 dist/              # Production build
    └── vite.config.js        # Vite configuration
```

## 🔌 API Endpoints

### Authentication

```http
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login
POST   /admin/auth/login      # Admin login
GET    /api/auth/verify       # Token verification
```

### Products

```http
GET    /api/products          # Get all products
GET    /api/products/:id      # Get single product
POST   /admin/products        # Create product (Admin)
PUT    /admin/products/:id    # Update product (Admin)
DELETE /admin/products/:id    # Delete product (Admin)
```

### Orders

```http
GET    /api/order             # Get user orders
POST   /api/order             # Create new order
PUT    /admin/orders/:id      # Update order status (Admin)
GET    /admin/orders          # Get all orders (Admin)
```

### Health Check

```http
GET    /health                # Server health status
```

## 🎨 UI/UX Features

### Design System

- **Consistent Color Palette** - Amber, Indigo, and Purple gradients
- **Dark Mode Support** - Seamless theme switching
- **Responsive Design** - Mobile-first approach
- **Micro-animations** - Hover effects, loading states, and transitions
- **Toast Notifications** - Real-time user feedback

### Admin Dashboard Highlights

- **Real-time Counters** - Animated statistics using CountUp.js
- **Optimistic Updates** - Instant UI feedback before server confirmation
- **Error Boundaries** - Graceful error handling with custom error pages
- **Loading States** - Skeleton screens and progress indicators

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Protected Routes** - Route guards for admin and user areas
- **Input Validation** - Server-side and client-side validation
- **CORS Configuration** - Controlled cross-origin requests
- **Password Hashing** - Secure password storage
- **File Upload Security** - Validated file types and sizes

## 📊 Performance Optimizations

- **Code Splitting** - Lazy loading with React.lazy()
- **Image Optimization** - Compressed uploads and responsive images
- **Caching Strategies** - Browser caching for static assets
- **Bundle Analysis** - Optimized build sizes with Vite
- **Memory Management** - Proper cleanup in useEffect hooks

## 🧪 Development Practices

### Code Quality

- **Component Architecture** - Reusable and maintainable components
- **Custom Hooks** - Business logic separation
- **Context API** - Centralized state management
- **Error Handling** - Comprehensive error boundaries
- **Clean Code** - Readable and well-documented code

### API Design

- **RESTful Conventions** - Proper HTTP methods and status codes
- **Consistent Response Format** - Standardized API responses
- **Error Standardization** - Uniform error handling
- **Middleware Usage** - Modular request processing

## 🚀 Deployment

### Production Build

```bash
# Build all applications
npm run build:all

# Start production server
npm run start:production
```

### Environment Variables

```env
# Production environment
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=your_secure_jwt_secret
PORT=5050
```

## 🛣️ Future Enhancements

- [ ] **Advanced Analytics** - Sales reports and customer insights
- [ ] **Email Notifications** - Order confirmations and updates
- [ ] **Search Enhancement** - Elasticsearch integration
- [ ] **Payment Gateway** - Stripe/PayPal integration
- [ ] **Real-time Chat** - Customer support system
- [ ] **Mobile App** - React Native implementation
- [ ] **Multi-vendor Support** - Marketplace functionality
- [ ] **Inventory Alerts** - Low stock notifications

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the flexible database solution
- Vite team for the lightning-fast build tool

---

## 👨‍💻 About the Developer

This project demonstrates proficiency in:

- **Full-Stack Development** - End-to-end application development
- **Modern React Patterns** - Hooks, Context API, and component architecture
- **Backend Development** - RESTful API design and database management
- **UI/UX Design** - Responsive design and user experience optimization
- **Performance Optimization** - Code splitting and lazy loading
- **Security Implementation** - Authentication and authorization
- **DevOps Practices** - Build processes and deployment strategies

**Built with ❤️ by RUDRESH H VYAS**

---

_Star ⭐ this repository if you found it helpful!_
