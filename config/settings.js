require('dotenv').config(); // Usar dotenv para manejar variables de entorno

module.exports = {
  databaseUrl: process.env.DATABASE_URL || 'sqlite:db.sqlite3',
  mail: {
    server: process.env.MAIL_SERVER || 'smtp.example.com',
    username: process.env.MAIL_USERNAME || 'your_email@example.com',
    password: process.env.MAIL_PASSWORD || 'your_password',
    port: parseInt(process.env.MAIL_PORT, 10) || 465,
    useTLS: process.env.MAIL_USE_TLS === 'true',
    useSSL: process.env.MAIL_USE_SSL !== 'false', // Default true
  },
  jwtSecretKey: process.env.JWT_SECRET_KEY || 'your_jwt_secret_key_here',
};
