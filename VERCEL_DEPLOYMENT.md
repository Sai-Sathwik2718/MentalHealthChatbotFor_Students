# 🚀 Vercel Deployment Guide for MindMate

This guide will help you deploy your MindMate chatbot to Vercel and resolve the network error you're experiencing.

## Why the Network Error Occurs

Your chatbot was getting a network error because:
1. **Vercel is a static hosting platform** - it only serves HTML, CSS, and JavaScript files
2. **Your backend (Node.js server) doesn't run on Vercel** - so API calls to `/v2/api` and `/api/chat-history` fail
3. **Vercel can't execute your `app.js`** - it's designed for frontend-only applications

## ✅ Solution: Client-Side Only Chatbot

I've modified your chatbot to work entirely in the browser without backend calls:

### What Changed:
- ❌ Removed authentication requirements
- ❌ Removed API calls to backend
- ✅ Added client-side bot responses
- ✅ Added localStorage for chat history
- ✅ Maintained all UI features and mental health support

### What Still Works:
- 🤖 Chatbot responses to mental health concerns
- 💬 Chat history (stored in browser)
- 🎯 Quick action buttons
- 🆘 Crisis resources and helplines
- 📱 Responsive design
- 🔒 Privacy (all data stays in your browser)

## 🚀 Deploy to Vercel

### Step 1: Prepare Your Repository
Make sure you have these files in your `Healhub` folder:
- `vercel.json` ✅ (I created this)
- `public/chatbot.html` ✅ (I modified this)
- `public/index.html` ✅ (I modified this)
- `README.md` ✅ (I updated this)

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to your project
cd Healhub

# Deploy
vercel

# Follow the prompts:
# - Link to existing project or create new
# - Set project name (e.g., mindmate-chatbot)
# - Confirm deployment
```

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Set project name
5. Deploy automatically

### Step 3: Test Your Deployment
After deployment, your chatbot will be available at:
`https://your-project-name.vercel.app`

## 🔧 If You Want Full Backend Features

If you want user authentication, database storage, and advanced features, you need to deploy your backend separately:

### Backend Hosting Options:

#### 1. Render (Free)
```bash
# Go to render.com
# Create new Web Service
# Connect your GitHub repo
# Set build command: npm install
# Set start command: npm start
# Add environment variables for database
```

#### 2. Railway
```bash
# Go to railway.app
# Create new project
# Deploy from GitHub
# Set environment variables
```

#### 3. Heroku
```bash
# Install Heroku CLI
npm i -g heroku

# Create app
heroku create your-app-name

# Deploy
git push heroku main
```

### Then Update Frontend:
1. Uncomment authentication code in `chatbot.html`
2. Update API endpoints to point to your backend URL
3. Redeploy to Vercel

## 📱 Current Features (Client-Side)

Your chatbot now provides:
- **Immediate Responses**: No waiting for server
- **Mental Health Support**: Anxiety, depression, stress, loneliness
- **Study Help**: Academic pressure, motivation, sleep issues
- **Crisis Resources**: Helplines, breathing exercises, meditation
- **Privacy**: All conversations stay in your browser
- **Offline Capability**: Works without internet after first load

## 🆘 Testing Your Deployment

1. **Visit your Vercel URL**
2. **Click "Start Chatting Now"**
3. **Try these test messages**:
   - "I feel anxious about my studies"
   - "I'm feeling lonely"
   - "I can't sleep"
   - "I'm stressed about exams"

## 🚨 Troubleshooting

### Still Getting Network Error?
1. Make sure you deployed the updated `chatbot.html`
2. Check that `vercel.json` is in your root folder
3. Verify deployment completed successfully

### Chatbot Not Responding?
1. Open browser console (F12)
2. Check for JavaScript errors
3. Ensure all files deployed correctly

### Want to Go Back to Full Backend?
1. Deploy backend to Render/Railway/Heroku
2. Uncomment authentication code in `chatbot.html`
3. Update API endpoints
4. Redeploy to Vercel

## 🎯 Next Steps

1. **Deploy to Vercel** using the guide above
2. **Test your chatbot** with mental health concerns
3. **Share the URL** with students who need support
4. **Consider backend deployment** if you want full features

## 💙 Remember

Your chatbot is now a **client-side application** that provides immediate mental health support without server dependencies. It's perfect for Vercel deployment and will work reliably for students who need help.

**If you need the full backend experience**, deploy your Node.js server separately and update the frontend accordingly.

---

**Need help?** Open an issue in your repository or check the main README.md for more detailed instructions.
