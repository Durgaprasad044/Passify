# Passify - Smart Gate Pass Management System

A comprehensive AI-powered gate pass and appointment management system with advanced analytics, pattern recognition, and intelligent automation.

## 🚀 Features

### 📝 Smart Request Creation
- Students submit gatepass/appointment requests with detailed information
- System predicts likelihood of approval and estimated response time
- Real-time AI-powered suggestions for optimal request timing

### 🔍 Pattern Analysis & Prediction
- Learns from previous data: reason, student behavior, day/time patterns
- Detects abnormal requests and flags them automatically
- Advanced ML algorithms for risk assessment

### 📊 Dashboard & Analytics
- Admin and student views showing approval trends
- Interactive graphs showing peak hours and common reasons
- Real-time analytics with comprehensive insights

### 💡 Bonus Features
- **Anomaly Detection**: ML flags suspicious behavior patterns
- **Priority Suggestions**: AI suggests best times for approval based on low traffic
- **Admin Feedback Loop**: Real approvals train the model continuously
- **Dark Mode**: Professional minimal UI with light/dark theme support

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Firebase Auth** for authentication

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Python** with scikit-learn for ML predictions

### AI/ML
- **scikit-learn** for machine learning
- **Random Forest** classifier for predictions
- **TF-IDF** vectorization for text analysis
- **Real-time** model training with admin feedback

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB (local or cloud)
- Git

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project
   - Enable Google Authentication
   - Update `src/firebase.ts` with your Firebase config

4. **Start development server**
   ```bash
   npm run dev
   ```

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Install Python dependencies**
   ```bash
   cd ml
   pip install -r requirements.txt
   cd ..
   ```

4. **Configure environment**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

5. **Start backend server**
   ```bash
   npm run dev
   ```

### Database Setup

1. **Install MongoDB** (if using local)
   - Download from [MongoDB website](https://www.mongodb.com/try/download/community)
   - Or use MongoDB Atlas (cloud)

2. **Configure connection**
   - Update `MONGODB_URI` in `.env` file
   - Default: `mongodb://localhost:27017/passify`

## 🔧 Configuration

### Firebase Configuration
Update `src/firebase.ts` with your Firebase project details:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### Environment Variables
Create `.env` file in backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/passify
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

## 🚀 Usage

### Student Portal
1. Login with Google account
2. Submit gate pass or appointment requests
3. View AI predictions for approval likelihood
4. Track request status and history

### Admin Portal
1. Login with Google account + admin password
2. Review pending requests with AI risk assessment
3. Approve/reject requests with feedback
4. View comprehensive analytics dashboard

### Admin Password
Default admin password: `admin123`
*(Change this in production)*

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `GET /api/user/profile` - Get user profile

### Requests
- `POST /api/requests` - Create new request
- `GET /api/requests/user` - Get user's requests
- `GET /api/requests` - Get all requests (admin)
- `PATCH /api/requests/:id` - Update request status

### Analytics
- `GET /api/analytics/overview` - Overview statistics
- `GET /api/analytics/time-slots` - Time slot analysis
- `GET /api/analytics/reasons` - Reason analysis

## 🤖 AI/ML Features

### Prediction Model
- **Input**: Reason, request type, time, student ID
- **Output**: Approval score (0-100), risk level, confidence
- **Algorithm**: Random Forest with TF-IDF text features

### Training Data
- Sample data included for demonstration
- Model improves with real admin feedback
- Continuous learning from approval patterns

### Risk Assessment
- **Low Risk**: Score ≥ 80
- **Medium Risk**: Score 60-79
- **High Risk**: Score < 60

## 🎨 UI Features

### Dark Mode
- Toggle between light and dark themes
- Professional minimal color scheme
- Smooth transitions and animations

### Advanced Animations
- 3D floating cards with hover effects
- Particle animations
- Smooth page transitions
- Loading states and micro-interactions

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions

## 🔒 Security

### Authentication
- Firebase Google OAuth
- JWT tokens for API access
- Role-based access control

### Data Protection
- Input validation and sanitization
- Secure password handling
- CORS configuration
- Environment variable protection

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist folder
```

### Backend (Heroku/Railway)
```bash
# Set environment variables
npm start
```

### Database
- MongoDB Atlas for production
- Local MongoDB for development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**Built with ❤️ using React, Node.js, and Python** 