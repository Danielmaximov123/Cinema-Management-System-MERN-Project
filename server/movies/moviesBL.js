const axios = require('axios')

const Movie = require('./movieModel');


// Inserts the whole list of movies at the initialization of the server
// Pulls data from REST API

const insertAllMovies = async () => {

    let resp = await axios.get("https://api.tvmaze.com/shows");
    let allMovies = resp.data;
    let dataToReturn = []

    allMovies.forEach(movie => {

        let movieData = {name : movie.name, genres : movie.genres,
                       image : movie.image.medium, premiered : movie.premiered}

        this.addMovie(movieData);
        dataToReturn.push(movieData)
     });

    return dataToReturn;

}

exports.getAllMovies = function()
{
    return new Promise((resolve,reject) =>
    {
        Movie.find({}, function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                if(!data.length){
                    let dataToReturn = insertAllMovies();
                    resolve(dataToReturn)
                }
                else {
                    resolve(data)
                }
            }
        });
    })
}

exports.getMoviesForSubscribe = function()
{
    return new Promise((resolve,reject) =>
    {
        Movie.find({}, function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                let moviesList = data.map(movie => {
                    return {id : movie._id, name : movie.Name}
                })

                resolve(moviesList)
            }
        });
    })
}


exports.getMovie = function(id)
{
    return new Promise((resolve,reject) =>
    {
        Movie.findById(id, function(err,data) 
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
        });
    })
}


exports.addMovie = function(obj)
{
    return new Promise((resolve,reject) =>
    {   let date = new Date;
        let movie = new Movie({
            Name : obj.name,
            Genres : obj.genres,
            Image : obj.image,
            CreatedDate : [date.getMonth()+1,
                date.getDate(),
                date.getFullYear()].join('/')+' '+
               [date.getHours(),
                date.getMinutes()].join(':'),
            Premiered : obj.premiered,
            Subscriptions : []
        });

        movie.save(err =>
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve(`${movie.Name} added successfully!`);
                }
            })
    })
}


exports.updateMovie = function(id,obj)
{
    return new Promise((resolve,reject) =>
    {
        Movie.findByIdAndUpdate(id,
        {
            Name : obj.name,
            Genres : obj.genres,
            Image : obj.image,
            Premiered : obj.premiered
        
        }, function(err)
        {

            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(`${obj.name} Updated successfully!`);
            }
        });
    })
}

exports.updateNewSubscription = async function (id, member) {

    let movieToUpdate = await this.getMovie(id)
    var subscriptions = movieToUpdate.Subscriptions;
    subscriptions.push(member);

    Movie.findByIdAndUpdate(id,
        {
            Subscriptions: subscriptions

        }, function (err) {

        if (err) {
            return (err);
        }
        else {
            return ('Subscription Added')
        }
    });

}

exports.deleteSubscription = async function(id, subscriptionsId)
{
    let movie = await this.getMovie(id)
    let filteredSubscriptions = movie.Subscriptions.filter(subscriptions => subscriptions.SubscriptionsId !== subscriptionsId)

    Movie.findByIdAndUpdate(id,
        {
            Subscriptions : filteredSubscriptions
        
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

exports.deleteMovie = async function (id) {
    let movieToDelete = await this.getMovie(id)
    let subscriptions = movieToDelete.Subscriptions;

    Movie.findByIdAndDelete(id, function (err) {

        if (err) {
            return(err);
        }
    })

    return subscriptions + `${movieToDelete.Name} has Deleted !`;
}

