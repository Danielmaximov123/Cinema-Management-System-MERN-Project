import axios from "axios";
const moviesBL = require('./movies/moviesBL');
const subscriptionsBL = require('./subscriptions/subscriptionsBL');

const Movie = require('./movies/movieModel');
const Subscriptions = require('./subscriptions/subscriptionsModel');

async function insertAllMovies () {

    let resp = await axios.get("https://api.tvmaze.com/shows");
    let allMovies = resp.data;

    allMovies.forEach(movie => {

        let movieData = {name : movie.data().name, Genres : movie.data().genres,
                       image : movie.data().image.medium, premiered : movie.data().premiered}

        moviesBL.addMovie(movieData);
     });

     let dataToReturn;

     Movie.find({}, function(err,data)
     {
         if(err)
         {
             dataToReturn = err;
         }
         else
         {
             dataToReturn = data;
         }
     });

    return dataToReturn;

}


async function insertAllSubscriptions () {

    let resp = await axios.get("https://jsonplaceholder.typicode.com/users");
    let allSubscriptions = resp.data;

    allSubscriptions.forEach(subscriptions => {

      let subscriptionsData = {name : subscriptions.data().name, email : subscriptions.data().email, city : subscriptions.data().address.city}
      subscriptionsBL.addMember(subscriptionsData);

     });

    let dataToReturn;

    Subscriptions.find({}, function(err,data)
        {
            if(err)
            {
                dataToReturn = err;
            }
            else
            {
                dataToReturn = data;
            }
        });

    return dataToReturn;
}

export default {insertAllMovies, insertAllSubscriptions}