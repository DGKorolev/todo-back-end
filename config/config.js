module.exports = {
  "production": {
    "dialect": "postgres",
    "url": process.env.DATABASE_URL,
    "database_url": process.env.DATABASE_URL,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  "development": {
    "username": "postgres",
    "password": "admin",
    "database": "todo",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
}