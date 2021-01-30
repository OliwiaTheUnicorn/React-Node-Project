const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

// connect with db

mongoose.connect(process.env.MONGO_URI,{useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log(' FUCKING Success'));
mongoose.connection.on('error', err => {
    console.log('error:')
});

// routes

const postRoutes = require('./routes/routespost');
const authRoutes = require('./routes/auth');

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use("/", postRoutes);
app.use("/", authRoutes);

// listening ports 

const port = process.env.PORT || 8080 ;
app.listen(port);