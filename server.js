const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/booking');
const doctorRoutes = require('./routes/doc');
require('dotenv').config();
const app = express();
app.use(express.json())
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:4200', // Change this to the actual origin of your Angular app
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Include cookies, if applicable
}));

const PORT = 4000;

// Middleware
app.use(bodyParser.json());

// Connexion à la base de données MongoDB

const mongoString = process.env.DATABASEURL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

// Routes
app.use('/auth', authRoutes);
app.use('/patient', patientRoutes);
app.use('/doctor', doctorRoutes);
app.use( '/getimage' , express.static('./upload')  );

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
