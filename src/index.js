const express = require('express');
const route = require('./route/route');
const mongoose = require('mongoose');
const app = express();

require("dotenv").config()

app.use(express.json());


mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use('/', route)


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});