# MindMate - Mental Health Chatbot for Students

A compassionate AI-powered mental health support system designed specifically for students, providing 24/7 access to guidance, crisis support, and practical strategies for mental wellness.

## Features

- 🤖 **AI-Powered Chatbot**: Intelligent responses to mental health concerns
- 💬 **24/7 Support**: Always available when you need someone to talk to
- 🎯 **Student-Focused**: Specifically designed for academic stress, social anxiety, and student life challenges
- 🆘 **Crisis Support**: Immediate access to emergency resources and helplines
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🔒 **Privacy-First**: All conversations are stored locally in your browser

## Quick Start (Vercel Deployment)

### Option 1: Deploy to Vercel (Recommended for Frontend Only)

1. **Fork/Clone this repository**
2. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```
3. **Deploy**:
   ```bash
   cd Healhub
   vercel
   ```
4. **Your chatbot will be live at**: `https://your-project.vercel.app`

### Option 2: Manual Vercel Deployment

1. Go to [vercel.com](https://vercel.com)
2. Create new project
3. Import your GitHub repository
4. Deploy automatically

## Full-Stack Deployment (With Backend)

For the complete experience with user authentication and database storage:

### Option 1: Render (Free)

1. **Deploy Backend**:
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect your GitHub repo
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Set environment variables for database

2. **Update Frontend**:
   - Uncomment authentication code in `chatbot.html`
   - Update API endpoints to point to your Render URL

### Option 2: Railway

1. **Deploy Backend**:
   - Go to [railway.app](https://railway.app)
   - Create new project
   - Deploy from GitHub
   - Set environment variables

### Option 3: Heroku

1. **Deploy Backend**:
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=mindmate_db
JWT_SECRET=your_secret_key
```

## Database Setup

1. **Install MySQL**
2. **Create Database**:
   ```sql
   CREATE DATABASE mindmate_db;
   ```
3. **Run the application** - tables will be created automatically

## Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Browser**: `http://localhost:3001`

## Project Structure

```
Healhub/
├── public/                 # Frontend files
│   ├── chatbot.html       # Main chatbot interface
│   ├── index.html         # Landing page
│   ├── css/               # Stylesheets
│   └── js/                # JavaScript files
├── chatbot/               # NLP model and chatbot logic
├── config/                # Configuration files
├── app.js                 # Express server (backend)
├── database.js            # Database connection
└── package.json           # Dependencies
```

## API Endpoints

- `POST /api/register` - User registration
- `POST /api/login` - User authentication
- `POST /v2/api` - Chatbot responses
- `GET /api/chat-history` - User chat history
- `GET /health` - Health check

## Mental Health Resources

- **Crisis Helpline**: 988 (National Suicide Prevention Lifeline)
- **Crisis Text Line**: Text HOME to 741741
- **Emergency**: 911

## Important Notes

⚠️ **This is not a substitute for professional mental health care.** If you're experiencing a mental health crisis, please contact a mental health professional or emergency services immediately.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

ISC License

## Support

For technical support or questions about deployment, please open an issue in this repository.

---

**Remember**: Your mental health matters. You're not alone, and it's okay to ask for help. 💙 