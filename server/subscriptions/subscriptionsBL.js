const axios = require('axios')
const Subscriptions = require('./subscriptionsModel');

// Inserts the whole list of movies at the initialization of the server
// Pulls data from REST API

const insertAllSubscriptions = async () => {

    let resp = await axios.get("https://jsonplaceholder.typicode.com/users");
    let allSubscriptions = resp.data;
    let dataToReturn = []

    allSubscriptions.forEach(subscriptions => {

        let subscriptionsData = { name: subscriptions.name, email: subscriptions.email, city: subscriptions.address.city }
        this.addSubscriptions(subscriptionsData);
        dataToReturn.push(subscriptionsData)

    });

    return dataToReturn;

}

exports.getAllSubscriptions = function () {

    return new Promise((resolve, reject) => {
        Subscriptions.find({}, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                if (!data.length) {
                    let dataToReturn = insertAllSubscriptions();
                    resolve(dataToReturn)
                }
                else {
                    resolve(data)
                }
            }
        });
    })
}


exports.getSubscriptions = function (id) {
    return new Promise((resolve, reject) => {
        Subscriptions.findById(id, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}


exports.addSubscriptions = function (obj) {
    return new Promise((resolve, reject) => {
        let date = new Date; 
        let subscriptions = new Subscriptions({
            Name: obj.name,
            Email: obj.email,
            City: obj.city,
            CreatedDate : [date.getMonth()+1,
                date.getDate(),
                date.getFullYear()].join('/')+' '+
               [date.getHours(),
                date.getMinutes()].join(':'),
            Movies : []
        });

        subscriptions.save(err => {
            if (err) {
                reject(err);
            }
            else {
                resolve(`${subscriptions.Name} Created Successfully!`);
            }
        })
    })
}


exports.updateSubscriptions = function (id, obj) {
    return new Promise((resolve, reject) => {
        Subscriptions.findByIdAndUpdate(id,
            {
                Name: obj.name,
                Email: obj.email,
                City: obj.city

            }, function (err) {

            if (err) {
                reject(err);
            }
            else {
                resolve('Updated');
            }
        });
    })
}

exports.updateNewMovie = async function (id, movie) {
    let subscriptionsToUpdate = await this.getSubscriptions(id)
    var movies = subscriptionsToUpdate.Movies;
    movies.push(movie);
    Subscriptions.findByIdAndUpdate(id ,
        {
            Movies: movies
            
        }, function (err) {
            
            if (err) {
                return (err);
            }
        });
    return movies;
}

exports.deleteMovies = async function(id, MovieId)
{   
    let subscriptions = await this.getSubscriptions(id)
    let filteredMovies = subscriptions.Movies.filter(movie => movie.MovieId !== MovieId)
    Subscriptions.findByIdAndUpdate(id,
        {
            Movies : filteredMovies
        
        }, function(err)
        {

            if(err)
            {
                return(err);
            }
            else
            {
                return('Updated');
            }
        });
}

exports.deleteSubscriptions = async function (id) {
    let subscriptionsToDelete = await this.getSubscriptions(id)
    let movies = subscriptionsToDelete.Movies;

    Subscriptions.findByIdAndDelete(id, function (err) {

        if (err) {
            return(err);
        }
    })

    return movies;
}