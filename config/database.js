// MySQL Database Configuration
export const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Sathwik@2718', // MySQL password set
    database: process.env.DB_NAME || 'mindmate_db',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
};

// Database initialization settings
export const initConfig = {
    createDatabaseIfNotExists: true,
    createTablesIfNotExists: true,
    createIndexesIfNotExists: true
}; 