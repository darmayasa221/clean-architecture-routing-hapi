const { Pool } = require('pg');

const testConfig = {
  host: process.env.HOST_TEST,
  port: process.env.PORT_TEST,
  user: process.env.USER_TEST,
  password: process.env.PASSWORD_TEST,
  database: process.env.DATABASE_TEST,
};

const pool = process.env.NODE_ENV === 'test' ? new Pool(testConfig) : new Pool();

module.exports = pool;
