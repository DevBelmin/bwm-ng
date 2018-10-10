const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const FakeDb = require('./models/fake-db');

const rentalRouts = require('./routes/rentals');

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

app.use('/api/v1/rentals', rentalRouts);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})

app.get('/rentals', (req, resp) => {
    resp.json({
        'success': true
    })
});