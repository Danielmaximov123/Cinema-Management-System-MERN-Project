const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://CinemaD-B:<password>@cinemadb.k23qi.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log("MongoDB is connected");
}).catch((err) => {
    console.log(`MongoDB not Connected ${err}`);
})
