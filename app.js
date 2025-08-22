import express, { response } from 'express';
// const express = require('express');
const app = express();
const port = 3001;

// Performance optimizations
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving with caching
app.use(express.static('public', {
  maxAge: '1h',
  etag: true
}));
app.use(express.static('images', {
  maxAge: '1h',
  etag: true
}));
app.use(express.static('uploads', {
  maxAge: '1h',
  etag: true
}));

// Response time middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  next();
 });

import chatbot from './chatbot/index.js';
import { getDatabase } from './database.js';

// JWT token storage (in production, use Redis or similar)
const tokens = new Map();

// Generate simple token (in production, use JWT)
function generateToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }
  
  const user = tokens.get(token);
  if (!user) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
  
  req.user = user;
  next();
}

// Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    
    const { userService } = await getDatabase();
    
    // Create user in database
    const newUser = await userService.createUser(name, email, password);
    
    res.status(201).json({ 
      message: 'User registered successfully',
      user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.message.includes('already exists')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const { userService } = await getDatabase();
    
    // Find user in database
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Verify password
    const isValidPassword = await userService.verifyPassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate token
    const token = generateToken();
    tokens.set(token, { id: user.id, name: user.name, email: user.email });
    
    res.json({ 
      message: 'Login successful',
      token: token,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get chat history endpoint
app.get('/api/chat-history', authenticateToken, async (req, res) => {
  try {
    const { chatHistoryService } = await getDatabase();
    const userId = req.user.id;
    
    const chatHistory = await chatHistoryService.getChatHistory(userId);
    
    res.json({ 
      chatHistory: chatHistory,
      totalMessages: chatHistory.length
    });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ message: 'Error fetching chat history' });
  }
});

// Enhanced chatbot endpoint with authentication and database storage
app.post('/v2/api', authenticateToken, async (req, res) => {
  try {
    const startTime = Date.now();
    const userMessage = req.body.inpText;
    const userId = req.user.id;
    const timestamp = new Date().toISOString();
    
    const { chatHistoryService } = await getDatabase();
    
    // Add user message to database
    await chatHistoryService.addMessage(userId, userMessage, 'user');
    
    // Get chatbot response
    let response = await chatbot(userMessage);
    const responseTime = Date.now() - startTime;
    
    // Add bot response to database
    await chatHistoryService.addMessage(userId, response, 'bot');
    
    console.log(`MindMate response time: ${responseTime}ms`);
    res.json({ 
      message: response, 
      responseTime: responseTime,
      timestamp: timestamp
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error', message: 'Something went wrong' });
  }
});

// Logout endpoint
app.post('/api/logout', authenticateToken, (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token) {
    tokens.delete(token);
  }
  
  res.json({ message: 'Logged out successfully' });
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const { pool } = await getDatabase();
    
    // Get database stats
    const [userCountResult] = await pool.execute('SELECT COUNT(*) as count FROM users');
    const userCount = userCountResult[0].count;
    
    const [messageCountResult] = await pool.execute('SELECT COUNT(*) as count FROM chat_history');
    const messageCount = messageCountResult[0].count;
    
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      database: 'MySQL',
      users: userCount,
      messages: messageCount,
      activeTokens: tokens.size
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Database info endpoint
app.get('/api/db-info', async (req, res) => {
  try {
    const { pool } = await getDatabase();
    
    // Get table information
    const [tables] = await pool.execute(`
      SELECT TABLE_NAME as name, TABLE_ROWS as rows 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = 'mindmate_db'
    `);
    
    res.json({
      database: 'MySQL',
      databaseName: 'mindmate_db',
      tables: tables,
      connectionStatus: 'Connected'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🧠 MindMate Mental Health Support System listening on port ${port}`);
  console.log(`Open http://localhost:${port} in your browser`);
  console.log(`Login page: http://localhost:${port}/login.html`);
  console.log(`Database: MySQL (mindmate_db)`);
});
