const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import CORS module
const userRoutes = require('./routes/users');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://admin:admin@finaldb.whgbnlf.mongodb.net/Final-API?retryWrites=true&w=majority&appName=FinalDB';

app.use(cors()); // Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin to access
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowable methods
  }));
  
app.use(bodyParser.json());
app.use('/users', userRoutes);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
