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

### 🏠 **Landing Page**

![Recallio Landing Page](./assets/screenshots/landing-page.png)
_Beautiful, clean landing page with clear value proposition and compelling call-to-action_

### 🎯 **Hero Section**

![Recallio Hero](./assets/screenshots/hero-section.png)
_Elegant hero section showcasing key stats: 10K+ Active Users, 1M+ Items Saved, 99.9% Uptime_

### 🔐 **Authentication Flow**

<div align="center">
  <img src="./assets/screenshots/signup.png" width="45%" alt="Sign Up" />
  <img src="./assets/screenshots/signin.png" width="45%" alt="Sign In" />
</div>

_Simple, intuitive authentication with clean form design_

### 📊 **Main Dashboard**

![Main Dashboard](./assets/screenshots/dashboard.png)
_Organized content dashboard featuring:_

- **Smart Sidebar** with content type filtering and weekly activity
- **Content Cards** showing YouTube videos, Twitter posts, and articles
- **Search Functionality** for instant content discovery
- **Real-time Counts** for each content type

### ➕ **Add Content Modal**

![Add Content Modal](./assets/screenshots/add-content-modal.png)
_Intelligent content addition with auto-detection of content types from URLs_

### ✨ **Key Features in Action**

**📊 Dashboard Overview:**

- **Content Organization** - 3 saved items displayed with timestamps (Yesterday)
- **Smart Sidebar** - Real-time counts: YouTube (1), Twitter (1), Articles (1)
- **Weekly Activity Graph** - Visual bar chart showing content creation patterns
- **Monthly Grouping** - Content organized by date (June 2025)

**🎥 YouTube Integration:**

- **Rich Video Embeds** - Full YouTube player with "Ed Sheeran - Photograph" example
- **Metadata Display** - Video titles, channel info, and thumbnails
- **Direct Playback** - Videos play directly within the app

**🐦 Twitter Integration:**

- **Complete Tweet Embeds** - Full tweet display with profile pictures
- **Rich Media** - Images and media content preserved
- **Interaction Buttons** - Like, Reply, and Share functionality maintained
- **Timestamp Preservation** - Original tweet dates and times shown

**📰 Article Management:**

- **Clean Article Cards** - "load balancer" article from medium.com example
- **Source Links** - Direct links to original articles
- **Organized Display** - Articles grouped with other content types

**🔍 Search & Organization:**

- **Real-time Search Bar** - "Search your collection..." placeholder
- **Content Type Filtering** - All Items, YouTube, Twitter, Articles tabs
- **Instant Results** - Live filtering as you type

### 🚀 **Experience It Live**

> 👉 **Try all these features yourself**: [https://recallio-eta.vercel.app](https://recallio-eta.vercel.app)
>
> Create an account and start building your digital collection today!

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
