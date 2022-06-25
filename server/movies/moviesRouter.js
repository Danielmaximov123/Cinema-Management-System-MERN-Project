const express = require('express');
const moviesBL = require('./moviesBL');

const router = express.Router();


router.route('/')
    .get(async (req,resp) =>
    {
        let data = await moviesBL.getAllMovies();
        return resp.json(data);
    })

router.route('/movies-for-subscribe')
    .get(async (req,resp) =>
    {
        let data = await moviesBL.getMoviesForSubscribe();
        return resp.json(data);
    })    

router.route('/:id')
    .get(async (req,resp) =>
    {
        let data = await moviesBL.getMovie(req.params.id);
        return resp.json(data);
    })

router.route('/')
    .post(async (req,resp) =>
    { 
        let status = await moviesBL.addMovie(req.body);
        return resp.json(status);
    })

router.route('/:id')
    .put(async (req,resp) =>
    {
        let status = await moviesBL.updateMovie(req.params.id,req.body);
        return resp.json(status);
    })

router.route('/new-sub-movie/:id')
    .put(async (req,resp) =>
    {   
        let status = await moviesBL.updateNewSubscription(req.params.id,req.body);
        return resp.json(status);
    })

router.route('/sub-del-movie/:id')
    .put(async (req,resp) =>
    {
        let status = await moviesBL.deleteSubscription(req.params.id, req.body.SubscriptionsId);
        return resp.json(status);
    })

router.route('/:id')
    .delete(async (req,resp) =>
    {
        let subscriptionToDelete = await moviesBL.deleteMovie(req.params.id);
        return resp.json(subscriptionToDelete);
    })


module.exports = router;


