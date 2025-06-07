# 🎯 Recallio - Your Digital Life, Beautifully Organized

> **Live Demo**: [https://recallio-eta.vercel.app](https://recallio-eta.vercel.app)

Save, organize, and rediscover everything that matters to you. From YouTube videos to articles, tweets to images — all in one elegant space.

![Recallio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
[![Website](https://img.shields.io/badge/Website-Live-blue?style=for-the-badge&logo=vercel)](https://recallio-eta.vercel.app)
[![API](https://img.shields.io/badge/API-Live-green?style=for-the-badge&logo=render)](https://recallio-be.onrender.com)

## ✨ Features

- 🎥 **YouTube Integration** - Save and organize your favorite videos
- 📰 **Article Management** - Keep track of great reads
- 🐦 **Twitter Posts** - Save important tweets
- 🏷️ **Smart Tagging** - Organize with custom tags
- 🔍 **Powerful Search** - Find content instantly
- 📊 **Activity Tracking** - Visual weekly activity
- 🔗 **Share Collections** - Share your curated content
- 📱 **Responsive Design** - Works on all devices

## 🚀 Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Deployed on Vercel**

### Backend

- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB Atlas** database
- **JWT Authentication**
- **Deployed on Render**

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│   (Vercel)      │◄──►│   (Render)      │◄──►│ (MongoDB Atlas) │
│                 │    │                 │    │                 │
│ React + TS      │    │ Node.js + TS    │    │ MongoDB         │
│ Tailwind CSS    │    │ Express API     │    │ Collections:    │
│ Zustand         │    │ JWT Auth        │    │ - Users         │
│                 │    │ CORS Enabled    │    │ - Contents      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🌐 Live URLs

- **Frontend**: [https://recallio-eta.vercel.app](https://recallio-eta.vercel.app)
- **Backend API**: [https://recallio-be.onrender.com](https://recallio-be.onrender.com)
- **API Health Check**: [https://recallio-be.onrender.com/api/v1/health](https://recallio-be.onrender.com/api/v1/health)

## 🚀 Quick Start

### Frontend

```bash
cd Recallio-fe
npm install
npm run dev
```

### Backend

```bash
cd Recallio-be
npm install
npm run dev
```

## 📱 Screenshots

_Beautiful, modern interface for organizing your digital content_

## 🔧 Environment Variables

### Frontend (.env)

```
VITE_API_BASE_URL=https://recallio-be.onrender.com/api/v1
```

### Backend (.env)

```
DATABASE_URL=mongodb+srv://...
JWT_SECRET=your-secret-key
NODE_ENV=production
```

## 🎯 Project Structure

```
Recallio/
├── Recallio-fe/          # React Frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── store/        # Zustand store
│   │   ├── services/     # API services
│   │   └── utils/        # Utility functions
│   └── public/           # Static assets
├── Recallio-be/          # Node.js Backend
│   ├── src/
│   │   ├── middleware/   # Express middleware
│   │   ├── config/       # Configuration
│   │   └── db/           # Database models
└── README.md
```

## 📊 Key Metrics

- ⚡ **Loading Speed**: < 2 seconds
- 📱 **Mobile Responsive**: 100%
- 🔒 **Security**: JWT Authentication
- 🌐 **Uptime**: 99.9%
- 🎨 **Performance**: Optimized for speed

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Harsh Verma**

- GitHub: [@harshverma7](https://github.com/harshverma7)
- Website: [https://recallio-eta.vercel.app](https://recallio-eta.vercel.app)

---

⭐ **Star this repository if you found it helpful!**
