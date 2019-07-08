let mongoose = require('mongoose');
const DB_HOST = process.env.DB_HOST;
mongoose.connect(
    DB_HOST, 
    {
        useNewUrlParser: true,
        autoIndex: false
    }, 
    function(err) {
        if (err) console.log(err);
        else console.log(`Mongoose connected on: ${DB_HOST}`)
    }
);