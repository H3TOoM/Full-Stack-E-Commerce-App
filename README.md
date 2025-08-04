# E-Commerce Platform

A full-stack E-Commerce solution built with Angular 15+ and .NET Core 7 Web API.

## 🚀 Features

### Frontend (Angular 15+)
- Responsive and modern UI with Angular Material
- Product catalog with categories and filters
- Shopping cart functionality
- User authentication and authorization
- Order management
- Product search and filtering
- Secure checkout process
- User profile management

### Backend (.NET Core 7 Web API)
- RESTful API design
- JWT Authentication
- Entity Framework Core for data access
- Repository pattern implementation
- SQL Server database
- File upload service for product images
- Order processing system
- Role-based authorization

## 🛠️ Prerequisites

### Frontend
- Node.js (v16 or later)
- Angular CLI (v15 or later)
- npm or yarn

### Backend
- .NET 7 SDK
- SQL Server 2019 or later
- Visual Studio 2022 or VS Code

## 🚀 Getting Started

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd client-side
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   - Copy `src/environments/environment.example.ts` to `src/environments/environment.ts`
   - Update API endpoints in the environment file

4. Run the application:
   ```bash
   ng serve
   ```
   The app will be available at `http://localhost:4200`

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd ../server-side/E-Commerce
   ```

2. Update the connection string in `appsettings.json`

3. Run database migrations:
   ```bash
   dotnet ef database update
   ```

4. Run the API:
   ```bash
   dotnet run
   ```
   The API will be available at `https://localhost:5001`

## 📂 Project Structure

### Frontend
```
src/
├── app/
│   ├── core/               # Core module (singleton services, guards, interceptors)
│   ├── features/           # Feature modules
│   │   ├── auth/           # Authentication
│   │   ├── products/       # Product catalog
│   │   ├── cart/           # Shopping cart
│   │   ├── orders/         # Order management
│   │   └── profile/        # User profile
│   ├── shared/             # Shared components, models, and services
│   └── app.component.*     # Root component
└── environments/           # Environment configurations
```

### Backend
```
E-Commerce/
├── Controllers/           # API Controllers
├── Data/                  # Database context and configurations
├── DTOs/                  # Data Transfer Objects
├── Entities/              # Domain models
├── Interfaces/            # Repository interfaces
├── Middleware/            # Custom middleware
├── Repositories/          # Data access layer
├── Services/              # Business logic
└── appsettings.json       # Configuration
```

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Register a new user at `/register`
2. Login at `/login` to receive a JWT token
3. Include the token in the `Authorization` header for subsequent requests:
   ```
   Authorization: Bearer your-jwt-token
   ```

## 🌐 API Documentation

API documentation is available using Swagger UI at:
```
https://localhost:5001/swagger
```

## 🧪 Testing

### Frontend Tests
Run unit tests:
```bash
ng test
```

Run end-to-end tests:
```bash
ng e2e
```

### Backend Tests
Run tests from the server directory:
```bash
dotnet test
```

## 🚀 Deployment

### Frontend
Build for production:
```bash
ng build --configuration production
```

Deploy the contents of the `dist` folder to your hosting provider.

### Backend
Publish the application:
```bash
dotnet publish -c Release
```

Deploy the published files to your server.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✨ Show your support

Give a ⭐️ if this project helped you!
