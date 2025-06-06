# 🧠 Recallio - Digital Memory

**Recallio** is a modern, full-stack digital content management platform that helps you save, organize, and search through your digital memories. Perfect for content creators, researchers, and anyone who wants to build their personal knowledge base. Built with React, TypeScript, Node.js, and MongoDB.

![Recallio Banner](https://img.shields.io/badge/Recallio-Digital%20Memory-black?style=for-the-badge)

## ✨ Features

### 🔐 **User Management**

- Secure user registration and authentication
- JWT-based session management
- Account deletion functionality

### 📚 **Content Management**

- Save content from various sources (YouTube, Twitter, Articles, Images, Videos, Audio)
- Add custom titles and tags for better organization
- Delete unwanted content
- Real-time content validation and URL processing

### 🔍 **Smart Search**

- Real-time search through titles and tags
- Debounced search input (300ms delay)
- Search results with content type filtering
- Case-insensitive partial matching

### 🎯 **Content Organization**

- Filter content by type (All, YouTube, Twitter, Articles, etc.)
- Monthly content grouping with timestamps
- Live content counts for each category
- Weekly activity tracking with visual graphs

### 🔗 **Sharing & Collaboration**

- Share entire collections with unique links
- Import collections from other users
- Duplicate detection during imports
- Public collection viewing

### 🎨 **Modern UI/UX**

- Clean, minimalist design with Tailwind CSS
- Responsive layout for all device sizes
- Smooth animations and transitions
- Intuitive sidebar navigation
- Smart empty states and loading indicators

## 🛠️ Tech Stack

### **Frontend**

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Axios** for API communication

### **Backend**

- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Zod** for request validation
- **bcrypt** for password hashing

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/harshverma7/Recallio.git
cd Recallio
```

### 2. Backend Setup

```bash
cd Recallio-be

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
# MONGODB_URL=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key

# Build the project
npm run build

# Start the server
npm start
```

The backend will run on `http://localhost:3000`

### 3. Frontend Setup

```bash
cd ../Recallio-fe

# Install dependencies
npm install

# Create environment file (optional)
# echo "VITE_API_BASE_URL=http://localhost:3000/api/v1" > .env

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
Recallio/
├── Recallio-be/           # Backend API
│   ├── src/
│   │   ├── index.ts       # Main server file
│   │   ├── db.ts          # Database models
│   │   ├── config/        # Configuration files
│   │   ├── middleware/    # Authentication & validation
│   │   └── utils/         # Utility functions
│   ├── dist/              # Compiled JavaScript
│   └── package.json
├── Recallio-fe/           # Frontend React app
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── store/         # Zustand stores
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript types
│   ├── public/
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication

- `POST /api/v1/signup` - User registration
- `POST /api/v1/signin` - User login
- `DELETE /api/v1/account` - Delete account

### Content Management

- `GET /api/v1/content` - Get user's content
- `POST /api/v1/content` - Create new content
- `DELETE /api/v1/content` - Delete content
- `GET /api/v1/content/search?q=query` - Search content

### Sharing

- `POST /api/v1/recall/share` - Create/remove share link
- `GET /api/v1/recall/:shareLink` - View shared collection
- `POST /api/v1/recall/import` - Import shared collection

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🎯 Future Enhancements

- Browser extension for quick content saving
- Advanced tag management system
- Content categorization with machine learning
- Export functionality (JSON, CSV)
- Collaborative collections
- Mobile app development
- Content preview generation
- Advanced analytics and insights

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need for better digital content organization
- Designed for simplicity and efficiency

## 📧 Contact & Support

- **GitHub**: [harshverma7/Recallio](https://github.com/harshverma7/Recallio)
- **Issues**: [Report bugs or request features](https://github.com/harshverma7/Recallio/issues)
- **Discussions**: [Join the community](https://github.com/harshverma7/Recallio/discussions)

---

**Recallio** - Your Digital Memory, Organized. 🧠✨

Made with ❤️ by [Harsh Verma](https://github.com/harshverma7)
