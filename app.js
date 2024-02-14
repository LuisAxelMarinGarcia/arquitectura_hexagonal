require('dotenv').config();
const express = require('express');
const SequelizeUserRepository = require('./adapters/SequelizeUserRepository');
const MongoUserRepository = require('./adapters/MongoUserRepository');

const app = express();
const PORT = process.env.PORT || 3000;

let userRepository;

if (process.env.DB_TYPE === 'mongodb') {
  userRepository = new MongoUserRepository();
} else {
  userRepository = new SequelizeUserRepository();
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
