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
    "username": "root_user",
    "password": "root_user",
    "database": "todo_db",
    "host": "127.0.0.5",
    "dialect": "postgres"
  },
}