const express = require('express')
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDb = require('./database/db');
const userRoutes = require('./api/routes/user');
const adminRoutes = require('./api/routes/admin');
const coachRoutes = require('./api/routes/coach');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

connectDb();

app.use('/api/user/', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/coach', coachRoutes);

module.exports = app
