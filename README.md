# 🏆 English Class Ranking System

> A simple gamified ranking system to motivate English students through points and friendly competition.

## 🎯 What is this?

This is a simple web app I built to gamify my English classes. Students earn points for activities and participation, and everyone can see the live ranking. It's designed to be fun, motivating, and easy to use.

## ✨ Features

- 🎮 **Gamified Learning**: Students earn points for activities
- 🏆 **Live Ranking**: Real-time leaderboard updates
- 📱 **Mobile Friendly**: Works great on phones and tablets
- 🔐 **Teacher Dashboard**: Protected admin area for managing students
- 🌐 **Public Ranking**: Students can view rankings anytime
- ⚡ **Fast & Simple**: Built with modern web technologies

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Yarn
- A Neon database account (free tier works fine)

### Setup

1. **Clone and install**
```bash
git clone https://github.com/SEU_USUARIO/english-ranking.git
cd english-ranking
yarn install
```

2. **Environment setup**
```bash
# Create .env file
DATABASE_URL=your_neon_database_url
ADMIN_PASSWORD=your_secure_password
```

3. **Initialize database**
```bash
yarn db:seed
```

4. **Start development server**
```bash
yarn dev
```

Visit `http://localhost:3000` to see the ranking!

## 🎓 How it works

### For Teachers
- Access the dashboard at `/login`
- Add students and manage their information
- Award points for activities and participation
- View statistics and recent activity

### For Students
- View the public ranking at the main URL
- See their position and points
- Check out the top 3 performers
- Track their progress over time

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Neon)
- **Deploy**: Vercel
- **Auth**: Simple cookie-based authentication


## 📁 Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── dashboard/      # Admin pages
│   ├── login/         # Login page
│   └── page.tsx       # Public ranking
├── components/        # Reusable components
├── db/               # Database setup
└── lib/              # Utilities
```

## 🤝 Contributing

Feel free to fork this project and adapt it for your own classes! If you have improvements, pull requests are welcome.

## 📝 License

MIT License - feel free to use this for your own classes or projects.

## 🚀 Future Plans

This started as an MVP for my specific class that needed extra motivation, but I'm planning to scale it up for the entire CNA unit where I work. The vision is to create a unified system where:

- **Multiple classes** can have their own rankings
- **Teachers** can manage their students independently
- **Students** can see both class and unit-wide rankings
- **Administrators** can track engagement across all classes

The current version is perfect for testing the concept and getting feedback from students and colleagues before building the full multi-class system.

## 👨‍💻 About

Built by a teacher who wanted to make learning more engaging. This project started as a simple way to motivate students and evolved into a full-featured ranking system.

---

⭐ **If this helped you motivate your students, consider giving it a star!**