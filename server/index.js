const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');
const FakeDb = require('./models/fake-db');

const rentalRouts = require('./routes/rentals');
const authRouts = require('./routes/auth');

mongoose.connect(config.mongoDbUri, { useNewUrlParser: true })
    .then(() => {
        let fakeDb = new FakeDb();
        fakeDb.seedDb();
    }, 
    (error) => {
        console.log('Error occured while trying to connect to the mongo DB', error);
    });

const PORT = process.env.PORT || 3001;

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/api/v1/rentals', rentalRouts);
app.use('/api/v1/auth', authRouts);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});