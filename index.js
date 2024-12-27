const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const bankRoutes = require('./routes/bankRoutes');

dotenv.config();
const app = express();



const PORT = 3000;

app.use(express.json());


app.use('/', authRoutes, transactionRoutes);
app.use('/bank', bankRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on PORT number ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });