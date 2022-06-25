const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    fname : String,
    lname : String,
    createdDate : String,
    sysAdmin : Boolean,
    permissions : {View_Movies : Boolean, Create_Movies : Boolean,
                   Update_Movies : Boolean, Delete_Movies : Boolean,
                   View_Subscriptions : Boolean, Create_Subscriptions : Boolean,
                   Update_Subscriptions : Boolean, Delete_Subscriptions : Boolean},
    SessionTimeOut : Number
})

module.exports = mongoose.model('users',UserSchema);

