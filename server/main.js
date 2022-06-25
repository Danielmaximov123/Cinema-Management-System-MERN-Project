const express = require('express');
const usersRouter = require('./users/usersRouter');
const moviesRouter = require('./movies/moviesRouter');
const subscriptionsRouter = require('./subscriptions/subscriptionsRouter');
const bodyParser = require('body-parser');
require('dotenv').config()

require ('./database')
const cors = require('cors');

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/subscriptions', subscriptionsRouter);

app.listen(process.env.PORT || 8000 , () => {
    console.log(`The Server is Running in ${8000 || process.env.PORT}`);
});