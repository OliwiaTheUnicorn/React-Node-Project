const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// const MongoClient = require('mongodb');

dotenv.config();

// connect with db

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true }).then(() => console.log(' FUCKING Success'));


mongoose.connection.on('error', err => {
    console.log('error:')
});

// bringing routes

const postRoutes = require('./routes/routespost');
const { Mongoose } = require('mongoose');

//middleware
app.use(morgan('dev'));

app.use("/", postRoutes);

const port = process.env.PORT || 27017 ;
app.listen(port);