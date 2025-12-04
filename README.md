# 💰 Student Budget Tracker App

A modern, intuitive budget tracking application designed specifically for students to manage their finances effectively. Built with React, TypeScript, and a beautiful UI powered by Radix UI components.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178c6.svg)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646cff.svg)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

## ✨ Features

- **📊 Dashboard Overview** - Get a comprehensive view of your financial status at a glance
- **💸 Expense Tracking** - Easily add, edit, and categorize your expenses
- **📈 Reports & Analytics** - Visualize your spending patterns with interactive charts
- **🤖 AI-Powered Insights** - Get smart suggestions to optimize your budget
- **🎯 Budget Categories** - Organize expenses into customizable categories
- **👤 User Profile & Settings** - Personalize your experience and manage account settings
- **🔐 Authentication** - Secure login and user management
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices
- **🌙 Modern UI** - Clean, intuitive interface with smooth animations

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.3.1
- **Language:** TypeScript
- **Build Tool:** Vite 6.3.5
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Charts:** Recharts
- **Styling:** Tailwind CSS (with class-variance-authority)
- **Animations:** Motion
- **Theme:** next-themes (Dark/Light mode support)
- **Form Handling:** React Hook Form
- **Notifications:** Sonner

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MeetDave-25/student-budget-tracker.git
   cd student-budget-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist` folder.

## 📖 Usage

1. **Onboarding** - Set up your monthly income and budget on first launch
2. **Add Expenses** - Track your daily expenses with categories
3. **View Dashboard** - Monitor your spending and remaining budget
4. **Check Reports** - Analyze your spending patterns over time
5. **AI Suggestions** - Get personalized tips to save money
6. **Manage Settings** - Update your profile and preferences

## 📁 Project Structure

```
student-budget-tracker/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── figma/           # Figma-imported components
│   │   ├── AIScreen.tsx     # AI insights screen
│   │   ├── BottomNav.tsx    # Bottom navigation
│   │   ├── CategoryIcon.tsx # Category icons
│   │   ├── Dashboard.tsx    # Main dashboard
│   │   ├── ExpenseScreen.tsx # Expense management
│   │   ├── LoginScreen.tsx  # Authentication
│   │   ├── OnboardingScreen.tsx # Initial setup
│   │   ├── ReportsScreen.tsx # Analytics & reports
│   │   └── SettingsScreen.tsx # User settings
│   ├── guidelines/          # Development guidelines
│   ├── styles/              # Global styles
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global CSS
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

## 📸 Screenshots

> **Note:** Add screenshots of your application here to showcase the UI and features.

### Dashboard
![Dashboard Screenshot](./screenshots/dashboard.png)

### Expense Tracking
![Expense Tracking Screenshot](./screenshots/expenses.png)

### Reports & Analytics
![Reports Screenshot](./screenshots/reports.png)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and follow the existing code style.

## 📄 License

**⚠️ IMPORTANT: This project requires explicit permission for ANY use.**

This project is licensed under a **Custom MIT License with Usage Restrictions**.

### Key Points:
- ✋ **Permission Required**: You MUST obtain written permission before using, forking, or modifying this code
- 🔒 **No Unauthorized Use**: Commercial or non-commercial use requires approval
- 🤝 **Contributions Welcome**: You may fork to contribute via Pull Request (after permission)
- 📧 **Request Permission**: Open an issue on GitHub to request usage rights

**Please read the full [LICENSE](LICENSE) file before using this project.**

For detailed contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## 🙏 Credits

- **Developer:** Made By Meet G. Dave

## 📞 Contact

For questions or feedback, please open an issue on GitHub.

---

⭐ If you find this project helpful, please consider giving it a star!
