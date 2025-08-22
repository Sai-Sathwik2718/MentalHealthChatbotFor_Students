import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { dbConfig, initConfig } from './config/database.js';

// Initialize database and create tables
async function initializeDatabase() {
    try {
        console.log('Connecting to MySQL database...');
        
        // First connect without database to create it if it doesn't exist
        const connection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            port: dbConfig.port
        });

        console.log('Connected to MySQL server successfully');

        if (initConfig.createDatabaseIfNotExists) {
            // Create database if it doesn't exist
            await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
            console.log(`Database '${dbConfig.database}' ready`);
        }
        
        await connection.query(`USE ${dbConfig.database}`);

        if (initConfig.createTablesIfNotExists) {
            // Create users table only if it doesn't exist
            await connection.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `);
            console.log('Users table ready');

            // Create chat_history table only if it doesn't exist
            await connection.query(`
                CREATE TABLE IF NOT EXISTS chat_history (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_id INT NOT NULL,
                    message TEXT NOT NULL,
                    sender ENUM('user', 'bot') NOT NULL,
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                )
            `);
            console.log('Chat history table ready');
        }

        if (initConfig.createIndexesIfNotExists) {
            // Create indexes for better performance
            try {
                await connection.query(`
                    CREATE INDEX idx_chat_history_user_id 
                    ON chat_history (user_id)
                `);
                console.log('User ID index created');
            } catch (error) {
                if (error.code !== 'ER_DUP_KEYNAME') {
                    console.log('User ID index already exists');
                }
            }

            try {
                await connection.query(`
                    CREATE INDEX idx_chat_history_timestamp 
                    ON chat_history (timestamp)
                `);
                console.log('Timestamp index created');
            } catch (error) {
                if (error.code !== 'ER_DUP_KEYNAME') {
                    console.log('Timestamp index already exists');
                }
            }
        }

        await connection.end();
        console.log('MySQL database initialized successfully');
        
        // Create connection pool for the application
        return mysql.createPool(dbConfig);
    } catch (error) {
        console.error('Database initialization error:', error);
        
        if (error.code === 'ECONNREFUSED') {
            console.error('❌ MySQL server is not running. Please start MySQL service.');
            console.error('💡 On Windows: Start MySQL from Services or XAMPP/WAMP');
            console.error('💡 On Mac: brew services start mysql');
            console.error('💡 On Linux: sudo systemctl start mysql');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('❌ Access denied. Please check your MySQL username and password.');
            console.error('💡 Update the password in config/database.js');
        } else if (error.code === 'ENOTFOUND') {
            console.error('❌ MySQL host not found. Please check your host configuration.');
        }
        
        throw error;
    }
}

// User operations
class UserService {
    constructor(pool) {
        this.pool = pool;
    }

    // Create new user
    async createUser(name, email, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const [result] = await this.pool.execute(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, hashedPassword]
            );
            
            return { id: result.insertId, name, email };
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error('User with this email already exists');
            }
            throw error;
        }
    }

    // Find user by email
    async findUserByEmail(email) {
        const [rows] = await this.pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0];
    }

    // Find user by ID
    async findUserById(id) {
        const [rows] = await this.pool.execute(
            'SELECT id, name, email, created_at FROM users WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    // Verify password
    async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

// Chat history operations
class ChatHistoryService {
    constructor(pool) {
        this.pool = pool;
    }

    // Add message to chat history
    async addMessage(userId, message, sender) {
        const [result] = await this.pool.query(
            'INSERT INTO chat_history (user_id, message, sender) VALUES (?, ?, ?)',
            [userId, message, sender]
        );
        return { id: result.insertId };
    }

    // Get chat history for a user
    async getChatHistory(userId, limit = 100) {
        const [rows] = await this.pool.query(
            'SELECT * FROM chat_history WHERE user_id = ? ORDER BY timestamp ASC LIMIT ?',
            [userId, limit]
        );
        return rows;
    }

    // Get recent conversations for a user
    async getRecentConversations(userId, limit = 20) {
        const [rows] = await this.pool.query(`
            SELECT 
                ch.id,
                ch.message,
                ch.sender,
                ch.timestamp,
                u.name as user_name
            FROM chat_history ch
            JOIN users u ON ch.user_id = u.id
            WHERE ch.user_id = ?
            ORDER BY ch.timestamp DESC
            LIMIT ?
        `, [userId, limit]);
        return rows.reverse(); // Return in chronological order
    }

    // Clear chat history for a user
    async clearChatHistory(userId) {
        const [result] = await this.pool.query(
            'DELETE FROM chat_history WHERE user_id = ?',
            [userId]
        );
        return { deletedRows: result.affectedRows };
    }
}

// Database connection and services
let pool = null;
let userService = null;
let chatHistoryService = null;

// Initialize database and services
async function getDatabase() {
    if (!pool) {
        pool = await initializeDatabase();
        userService = new UserService(pool);
        chatHistoryService = new ChatHistoryService(pool);
    }
    return { pool, userService, chatHistoryService };
}

// Close database connection
async function closeDatabase() {
    if (pool) {
        await pool.end();
        console.log('MySQL connection pool closed');
    }
}

// Handle process termination
process.on('SIGINT', async () => {
    await closeDatabase();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await closeDatabase();
    process.exit(0);
});

export { getDatabase, closeDatabase }; 