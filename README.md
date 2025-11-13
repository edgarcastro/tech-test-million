# Property Management System - Technical Test

A full-stack property management application built with .NET 9.0 backend and React frontend, featuring property listing, filtering, and detail views.

## 🏗️ Architecture

### Backend

- **Framework**: ASP.NET Core 9.0
- **Database**: MongoDB 7.0
- **Architecture**: Clean Architecture with Repository and Service layers
- **API Style**: RESTful API with Controllers

### Frontend

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **State Management**: Redux Toolkit
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM

## 📋 Features

### Property Management

- ✅ List all properties with pagination-ready structure
- ✅ Filter properties by:
  - Name (case-insensitive partial match)
  - Address (case-insensitive partial match)
  - Price range (min/max)
- ✅ View individual property details
- ✅ Display property images (first enabled image in list, all images in detail view)
- ✅ Responsive design for mobile, tablet, and desktop

### Technical Implementation

- ✅ Clean and modular architecture
- ✅ TypeScript types matching C# DTOs
- ✅ Error handling and loading states
- ✅ CORS configuration for frontend-backend communication
- ✅ Docker Compose setup for easy deployment
- ✅ MongoDB data seeding with mock data

## 🚀 Getting Started

### Prerequisites

- Docker Desktop (or Docker Engine + Docker Compose)
- Git (optional)

### Installation

1. **Clone the repository** (if applicable)

   ```bash
   git clone <repository-url>
   cd tech-test-million
   ```

2. **Start the application**

   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:5172
   - Backend API: http://localhost:5254
   - MongoDB: localhost:27017

### Manual Setup (Alternative)

#### Backend Setup

```bash
cd backend
dotnet restore
dotnet run
```

#### Frontend Setup

```bash
cd frontend
yarn install
yarn dev
```

## 📁 Project Structure

```
tech-test-million/
├── backend/
│   ├── Controllers/          # API Controllers
│   ├── Models/               # Entity models, DTOs, and configuration
│   │   └── DTOs/             # Data Transfer Objects
│   ├── Repositories/         # Data access layer
│   ├── Services/             # Business logic layer
│   └── Program.cs            # Application entry point
├── frontend/
│   ├── src/
│   │   ├── api/              # API service layer
│   │   ├── components/       # React components
│   │   │   └── ui/           # shadcn/ui components
│   │   ├── pages/            # Page components
│   │   ├── store/           # Redux store and slices
│   │   ├── types/           # TypeScript type definitions
│   │   └── lib/             # Utility functions
│   └── package.json
├── database/
│   └── mongo.init.js        # MongoDB initialization script
└── docker-compose.yml        # Docker orchestration
```

## 🔌 API Documentation

### Base URL

```
http://localhost:5254
```

### Endpoints

#### Get Properties

```
GET /properties
```

**Query Parameters:**

- `name` (string, optional): Filter by property name
- `address` (string, optional): Filter by property address
- `minPrice` (decimal, optional): Minimum price filter
- `maxPrice` (decimal, optional): Maximum price filter

**Response:**

```json
[
  {
    "idProperty": "string",
    "idOwner": "string",
    "name": "string",
    "address": "string",
    "price": 0,
    "image": "base64-string-or-null"
  }
]
```

**Example:**

```bash
GET /properties?name=Apartment&minPrice=500000&maxPrice=1000000
```

#### Get Property by ID

```
GET /properties/{id}
```

**Response:**

```json
{
  "idProperty": "string",
  "idOwner": "string",
  "name": "string",
  "address": "string",
  "price": 0,
  "image": "base64-string-or-null",
  "images": ["base64-string-array"] | null
}
```

## 🗄️ Database Schema

### Collections

#### Owners

- `_id` (ObjectId)
- `name` (string)
- `address` (string)
- `photo` (byte[] | null)
- `birthday` (DateTime | null)

#### Properties

- `_id` (ObjectId)
- `name` (string)
- `address` (string)
- `price` (decimal)
- `codeInternal` (string)
- `year` (int | null)
- `idOwner` (ObjectId) - Foreign key to Owners

#### PropertyImages

- `_id` (ObjectId)
- `idProperty` (ObjectId) - Foreign key to Properties
- `file` (byte[])
- `enabled` (bool)

#### PropertyTraces

- `_id` (ObjectId)
- `idProperty` (ObjectId) - Foreign key to Properties
- `dateSale` (DateTime | null)
- `name` (string)
- `value` (decimal)
- `tax` (decimal)

## 🛠️ Technologies Used

### Backend

- .NET 9.0
- ASP.NET Core Web API
- MongoDB.Driver 3.5.0
- Microsoft.AspNetCore.OpenApi

### Frontend

- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.2
- Redux Toolkit 2.10.1
- React Router DOM 7.9.5
- Tailwind CSS 3.4.18
- shadcn/ui components
- classnames 2.5.1

## 🎨 Frontend Features

### Components

- **PropertyCard**: Displays property information in card format
- **PropertyList**: Responsive grid layout for property cards
- **PropertyFilters**: Filter form with name, address, and price range inputs
- **PropertyDetail**: Detailed property view with image gallery
- **LoadingSpinner**: Loading state indicators
- **ErrorMessage**: Error display component

### State Management

- Redux Toolkit for global state
- Async thunks for API calls
- Filter state management
- Selected property state

### Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Grid layouts: 1 column (mobile), 2-3 columns (tablet), 4 columns (desktop)

## 🔧 Configuration

### Environment Variables

#### Backend

- `MONGO_CONNECTION_STRING`: MongoDB connection string
- `CORS_ORIGINS`: Comma-separated list of allowed CORS origins
- `ASPNETCORE_URLS`: Application URLs

#### Frontend

- `VITE_BACKEND_URL`: Backend API URL (default: http://localhost:5254)

### MongoDB Configuration

- Database: `tech-test-million`
- Username: `root`
- Password: `password`
- Port: `27017`

## 🧪 Testing the Application

1. **Start the application** using Docker Compose
2. **Access the frontend** at http://localhost:5172
3. **Test filters**:
   - Enter property name in filter
   - Enter address in filter
   - Set price range (min/max)
   - Click "Apply Filters"
4. **View property details**: Click on any property card
5. **Test responsive design**: Resize browser window or use device emulation

## 📝 Development Notes

### Backend

- Uses Repository pattern for data access
- Service layer for business logic
- DTOs for API responses
- MongoDB ObjectId for entity IDs
- CORS enabled for frontend communication

### Frontend

- TypeScript types match C# DTOs
- Image handling: Converts byte[] to base64 data URLs
- Redux Toolkit for state management
- shadcn/ui for consistent UI components
- Tailwind CSS for styling
- Responsive design throughout

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**

   - Change ports in `docker-compose.yml`
   - Or stop conflicting services

2. **MongoDB connection errors**

   - Ensure MongoDB container is running
   - Check connection string in environment variables

3. **CORS errors**

   - Verify `CORS_ORIGINS` environment variable
   - Check backend CORS configuration

4. **Frontend not loading**
   - Check if backend is running
   - Verify `VITE_BACKEND_URL` environment variable
   - Check browser console for errors

## 📄 License

This is a technical test project.

## 👤 Author

Technical Test Implementation
