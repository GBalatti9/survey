module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "trivia_boca",
    "host": "127.0.0.1",
    "port": "3307",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": "triviaboca",
    "host": process.env.DATABASE_URL,
    "dialect": "mysql"
  }
}
