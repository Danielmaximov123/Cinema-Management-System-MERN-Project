const mongoose = require('mongoose');

let SubscriptionsSchema = new mongoose.Schema({
    Name : String,
    Email : String,
    City : String,
    CreatedDate : Date,
    Movies : [{MovieId : String, MovieName : String, Date : String}]

})

module.exports = mongoose.model('Subscriptions',SubscriptionsSchema);
