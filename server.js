require('dotenv').config();
const express = require('express');
require('./config/db');
const app = express();
// const userRoutes = require('./routes/user');
app.use(express.json());
// userRoutes(app);
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());
require('./routes')(app);
const PORT = process.env.PORT || 3001
console.log('PORT', PORT);
app.listen(PORT, () => {
  console.log('Server Started...');
})
