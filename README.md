# 🧠 MindMate - Mental Health Support for Students

A comprehensive mental health support system designed specifically for students, featuring an AI-powered chatbot, secure user authentication with MySQL database storage, and crisis support resources.

## ✨ Features

### 🔐 User Authentication & Database
- **User Registration**: Create an account with name, email, and securely hashed password
- **Secure Login**: JWT-based authentication system with persistent sessions
- **Database Storage**: MySQL database for users and chat history
- **Password Security**: Bcrypt hashing for secure password storage
- **User Sessions**: Persistent login with secure token management

### 🤖 AI-Powered Mental Health Chatbot
- **24/7 Availability**: Always available when you need support
- **Student-Focused**: Specifically trained on student mental health concerns
- **Crisis Detection**: Identifies and responds to crisis situations
- **Comprehensive Training**: Covers study stress, anxiety, depression, loneliness, and more
- **NLP Model**: Uses existing `model.nlp` file or trains new model if needed

### 🎯 Mental Health Topics Covered
- **Academic Stress**: Study anxiety, exam pressure, homework overwhelm
- **Social Issues**: Loneliness, isolation, friendship challenges
- **Sleep Problems**: Insomnia, sleep hygiene, rest optimization
- **Mood Management**: Depression, low motivation, emotional regulation
- **Stress Management**: Coping strategies, relaxation techniques
- **Crisis Support**: Self-harm prevention, suicide awareness

### 🚀 Quick Actions & Resources
- **Quick Action Buttons**: Pre-written messages for common concerns
- **Resource Library**: Crisis helplines, meditation guides, breathing exercises
- **Professional Referrals**: Information about student counseling services

### 💾 Chat History & Database
- **Persistent Storage**: All conversations stored in MySQL database
- **User-Specific History**: Each user has their own separate chat history
- **Conversation Management**: View, navigate, and manage chat history
- **Data Persistence**: Chat history survives server restarts

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- **MySQL Server** (v5.7 or higher)

### MySQL Setup

1. **Install MySQL Server**
   - **Windows**: Download from [MySQL Official Site](https://dev.mysql.com/downloads/mysql/) or use XAMPP/WAMP
   - **Mac**: `brew install mysql`
   - **Linux**: `sudo apt-get install mysql-server` (Ubuntu/Debian)

2. **Start MySQL Service**
   - **Windows**: Start from Services or XAMPP/WAMP Control Panel
   - **Mac**: `brew services start mysql`
   - **Linux**: `sudo systemctl start mysql`

3. **Configure MySQL**
   ```bash
   # Connect to MySQL as root
   mysql -u root -p
   
   # Create a new user (optional but recommended)
   CREATE USER 'mindmate_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON mindmate_db.* TO 'mindmate_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

4. **Update Database Configuration**
   Edit `config/database.js` with your MySQL credentials:
   ```javascript
   export const dbConfig = {
       host: 'localhost',
       user: 'root', // or 'mindmate_user'
       password: 'your_mysql_password',
       database: 'mindmate_db',
       port: 3306
   };
   ```

### Installation

1. **Clone or download the project**
   ```bash
   cd Healhub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Main page: http://localhost:3001
   - Login page: http://localhost:3001/login.html
   - Chatbot: http://localhost:3001/chatbot.html (after login)

## 📱 How to Use

### 1. **Registration & Login**
- Visit `/login.html`
- Click "Register" tab to create an account
- Use your email and password to log in
- You'll be automatically redirected to the MindMate chatbot

### 2. **Using the Chatbot**
- **Type your message**: Share what's on your mind
- **Use Quick Actions**: Click pre-written buttons for common concerns
- **Access Resources**: Use the sidebar for immediate help and information
- **Get Support**: Receive compassionate, evidence-based responses

### 3. **Chat History Features**
- **View History**: Left panel shows all your previous conversations
- **Navigate Conversations**: Click any conversation to reload it
- **Persistent Storage**: Your chat history is saved and persists between sessions
- **User Privacy**: Each user only sees their own chat history

### 4. **Quick Actions Available**
- 😰 Study Anxiety
- 😔 Loneliness
- 😴 Sleep Issues
- 😤 Stress Management
- 💪 Motivation

### 5. **Resources Available**
- 🆘 Crisis Helpline (988)
- 🧘‍♀️ Meditation Guide
- 🫁 Breathing Exercises
- 👥 Student Counseling Info
- 💝 Self-Care Tips

## 🏗️ System Architecture

### Frontend
- **HTML5**: Semantic markup with modern design
- **CSS3**: Responsive design with gradients and animations
- **JavaScript**: Interactive features and API communication

### Backend
- **Node.js**: Server runtime environment
- **Express.js**: Web application framework
- **MySQL**: Relational database for data persistence
- **node-nlp**: Natural language processing for chatbot
- **bcryptjs**: Secure password hashing

### Database Schema
```sql
-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Chat history table
CREATE TABLE chat_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    sender ENUM('user', 'bot') NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_chat_history_user_id ON chat_history (user_id);
CREATE INDEX idx_chat_history_timestamp ON chat_history (timestamp);
```

### Security Features
- **Token-based Authentication**: Secure user sessions
- **Password Hashing**: Bcrypt with salt rounds
- **Input Validation**: Server-side request validation
- **Error Handling**: Comprehensive error management
- **Crisis Detection**: Immediate response to dangerous situations

## 🔒 Security & Privacy

- **User Data**: Stored securely in MySQL database
- **Password Security**: Bcrypt hashing with salt
- **Authentication**: JWT tokens with secure generation
- **Confidentiality**: All conversations are private and user-specific
- **Crisis Support**: Immediate access to professional help

## 🚨 Crisis Support

**If you're experiencing a mental health crisis:**

1. **Call 988** - National Suicide Prevention Lifeline (24/7)
2. **Text HOME to 741741** - Crisis Text Line
3. **Go to the nearest emergency room**
4. **Tell someone you trust immediately**

**MindMate is designed to provide support and guidance, but it is NOT a substitute for professional mental health care.**

## 🛠️ Development

### Project Structure
```
Healhub/
├── app.js                 # Main server file
├── database.js            # Database configuration and services
├── config/
│   └── database.js        # MySQL configuration
├── chatbot/
│   └── index.js          # Chatbot logic and training
├── public/
│   ├── login.html        # Authentication page
│   ├── chatbot.html      # Main chatbot interface
│   ├── index.html        # Landing page
│   └── css/
│       └── styles.css    # Global styles
├── model.nlp              # NLP model file
└── package.json          # Dependencies and scripts
```

### Available Scripts
- `npm start`: Start production server
- `npm run dev`: Start development server with auto-restart
- `npm test`: Run tests (if configured)

### API Endpoints
- `POST /api/register`: User registration
- `POST /api/login`: User authentication
- `GET /api/chat-history`: Retrieve user's chat history
- `POST /v2/api`: Chatbot conversation
- `POST /api/logout`: User logout
- `GET /health`: System health check
- `GET /api/db-info`: Database information

### Database Operations
- **User Management**: Create, authenticate, and manage users
- **Chat Storage**: Store and retrieve conversation history
- **Data Persistence**: All data survives server restarts
- **Performance**: Indexed queries for fast data retrieval

## 🔧 Troubleshooting

### Common MySQL Issues

1. **Connection Refused**
   - Ensure MySQL service is running
   - Check if port 3306 is available

2. **Access Denied**
   - Verify username and password in `config/database.js`
   - Check MySQL user privileges

3. **Database Not Found**
   - The system will create the database automatically
   - Ensure MySQL user has CREATE privileges

4. **Table Creation Errors**
   - Check MySQL user permissions
   - Ensure MySQL version is 5.7 or higher

### Environment Variables
You can also use environment variables for database configuration:
```bash
export DB_HOST=localhost
export DB_USER=root
export DB_PASSWORD=your_password
export DB_NAME=mindmate_db
export DB_PORT=3306
```

## 🌟 Future Enhancements

- [ ] PostgreSQL integration as alternative database
- [ ] User profiles and conversation history export
- [ ] Advanced NLP with sentiment analysis
- [ ] Mobile app development
- [ ] Integration with university counseling services
- [ ] Multi-language support
- [ ] Voice chat capabilities
- [ ] Analytics and insights dashboard

## 🤝 Contributing

This project is designed to help students with mental health support. Contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For technical support or questions about the system:
- Check the documentation
- Review the code comments
- Test the endpoints with the health check
- Check database status at `/api/db-info`
- Verify MySQL connection and configuration

---

**Remember**: Your mental health matters. MindMate is here to support you, but professional help is always the best option for serious concerns. You're not alone, and help is available. 💙 