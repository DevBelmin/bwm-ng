var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/dev');

mongoose.connect(config.mongoDbUri, { useNewUrlParser: true });

const PORT = process.env.PORT || 3001;

var app = express();

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})

app.get('/rentals', (req, resp) => {
    resp.json({
        'success': true
    })
});