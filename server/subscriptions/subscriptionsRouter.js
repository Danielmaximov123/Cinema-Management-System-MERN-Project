const express = require('express');
const subscriptionsBL = require('./subscriptionsBL');

const router = express.Router();


router.route('/')
    .get(async (req,resp) =>
    {
        let data = await subscriptionsBL.getAllSubscriptions();
        return resp.json(data);
    })

router.route('/:id')
    .get(async (req,resp) =>
    {
        let data = await subscriptionsBL.getSubscriptions(req.params.id);
        return resp.json(data);
    })

router.route('/')
    .post(async (req,resp) =>
    {
        let status = await subscriptionsBL.addSubscriptions(req.body);
        return resp.json(status);
    })

router.route('/:id')
    .put(async (req,resp) =>
    {
        let status = await subscriptionsBL.updateSubscriptions(req.params.id,req.body)
        return resp.json(status);
    }) 

router.route('/new-movie-subs/:id')
    .put(async (req,resp) =>
    {
        let moviesList = await subscriptionsBL.updateNewMovie(req.params.id,req.body);
        return resp.json(moviesList);
    })


router.route('/del-movie-subs/:id')
    .put(async (req,resp) =>
    {   
        req.body.MovieId
        let status = await subscriptionsBL.deleteMovies(req.params.id, req.body.MovieId);
        return resp.json(status);
    })   

router.route('/:id')
    .delete(async (req,resp) =>
    {
        let moviesToDelete = await subscriptionsBL.deleteSubscriptions(req.params.id)
        return resp.json(moviesToDelete);
    })


module.exports = router;


