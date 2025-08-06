const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PythonShell } = require('python-shell');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/passify', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Models
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  studentId: { type: String, unique: true, sparse: true },
  department: String,
  createdAt: { type: Date, default: Date.now }
});

const requestSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  type: { type: String, enum: ['Gate Pass', 'Appointment'], required: true },
  reason: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  destination: String,
  duration: String,
  additionalInfo: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  aiScore: { type: Number, default: 0 },
  riskLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  adminFeedback: String,
  submittedAt: { type: Date, default: Date.now },
  processedAt: Date,
  processedBy: String
});

const User = mongoose.model('User', userSchema);
const Request = mongoose.model('Request', requestSchema);

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Passify API is running' });
});

// User registration/login
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, name, role, studentId, department } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      email,
      name,
      role,
      studentId,
      department
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user profile
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create request
app.post('/api/requests', authenticateToken, async (req, res) => {
  try {
    const {
      type, reason, date, time, destination, duration, additionalInfo
    } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // AI Prediction using Python script
    const predictionOptions = {
      mode: 'text',
      pythonPath: 'python',
      pythonOptions: ['-u'],
      scriptPath: './ml',
      args: [reason, type, time, user.studentId]
    };

    let aiScore = 75; // Default score
    let riskLevel = 'medium';

    try {
      const results = await new Promise((resolve, reject) => {
        PythonShell.run('predict.py', predictionOptions, (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      if (results && results.length > 0) {
        const prediction = JSON.parse(results[0]);
        aiScore = prediction.score;
        riskLevel = prediction.risk_level;
      }
    } catch (error) {
      console.error('AI prediction error:', error);
      // Continue with default values if AI fails
    }

    const request = new Request({
      studentId: user.studentId,
      studentName: user.name,
      type,
      reason,
      date,
      time,
      destination,
      duration,
      additionalInfo,
      aiScore,
      riskLevel
    });

    await request.save();

    res.status(201).json({
      message: 'Request created successfully',
      request: {
        ...request.toObject(),
        prediction: {
          likelihood: aiScore,
          responseTime: `${Math.floor(Math.random() * 4) + 1} hours`
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user requests
app.get('/api/requests/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const requests = await Request.find({ studentId: user.studentId })
      .sort({ submittedAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all requests (admin only)
app.get('/api/requests', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { status, search } = req.query;
    let filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } }
      ];
    }

    const requests = await Request.find(filter).sort({ submittedAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update request status (admin only)
app.patch('/api/requests/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { status, adminFeedback } = req.body;
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.status = status;
    request.adminFeedback = adminFeedback;
    request.processedAt = new Date();
    request.processedBy = user.name;

    await request.save();

    res.json({ message: 'Request updated successfully', request });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Analytics endpoints
app.get('/api/analytics/overview', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const totalRequests = await Request.countDocuments();
    const approvedRequests = await Request.countDocuments({ status: 'approved' });
    const pendingRequests = await Request.countDocuments({ status: 'pending' });
    const rejectedRequests = await Request.countDocuments({ status: 'rejected' });

    const approvalRate = totalRequests > 0 ? (approvedRequests / totalRequests) * 100 : 0;

    res.json({
      totalRequests,
      approvedRequests,
      pendingRequests,
      rejectedRequests,
      approvalRate: Math.round(approvalRate * 100) / 100
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/analytics/time-slots', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const timeSlots = await Request.aggregate([
      {
        $group: {
          _id: '$time',
          requests: { $sum: 1 },
          approved: {
            $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          time: '$_id',
          requests: 1,
          approvalRate: {
            $multiply: [
              { $divide: ['$approved', '$requests'] },
              100
            ]
          }
        }
      },
      { $sort: { time: 1 } }
    ]);

    res.json(timeSlots);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/analytics/reasons', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const reasons = await Request.aggregate([
      {
        $group: {
          _id: '$reason',
          count: { $sum: 1 },
          approved: {
            $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          reason: '$_id',
          count: 1,
          approvalRate: {
            $multiply: [
              { $divide: ['$approved', '$count'] },
              100
            ]
          }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json(reasons);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 