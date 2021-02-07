const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

// connect with db

mongoose.connect(process.env.MONGO_URI,{useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log('Connected with DB succesfully'));
mongoose.connection.on('error', err => {
    console.log('error:')
});

// routes

const postRoutes = require('./routes/routespost');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const { db } = require('./models/user');

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error: "Unauthorised."});
    }
  });

// listening ports 

const port = process.env.PORT || 8080 ;
app.listen(port);


