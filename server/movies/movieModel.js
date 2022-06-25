const mongoose = require('mongoose');

let MovieSchema = new mongoose.Schema({
    Name : String,
    Genres : [String],
    Image : String,
    Premiered : String,
    CreatedDate : Date,
    Subscriptions : [{SubscriptionsId : String, SubscriptionsName : String, Date : String}]
})

module.exports = mongoose.model('movies',MovieSchema);
