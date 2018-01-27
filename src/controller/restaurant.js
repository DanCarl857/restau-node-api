import mongoose from 'mongoose';
import { Router } from 'express';
import Restaurant from '../models/restaurant';
import Review from '../models/review';

export default({ config, db }) => {

    let api = Router();

    // '/v1/restaurant/add'
    api.post('/api', (req, res) => {

        let newRest = new Restaurant();
        newRest.name = req.body.name;
        newRest.restauranttype = req.body.restauranttype;
        newRest.avgcost = req.body.avgcost;
        newRest.geometry.coordinates = req.body.geometry.coordinates;

        newRest.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Restaurant saved successfully' });
        });
    });

    // '/v1/restaurant - Read
    api.get('/', (req, res) => {
        Restaurant.find({}, (err, restaurants) => {

            if (err) {
                res.send(err);
            }
            res.json(restaurants);
        });
    });

    // 'v1/restaurant/:id' - Read 1
    api.get('/:id', (req, res) => {
        Restaurant.findById(req.params.id, (err, restaurant) => {

            if (err) {
                res.send(err);
            }
            res.json(restaurant);
        });
    });

    // 'v1/restaurant/:id' - Update
    api.put('/:id', (req, res) => {
        Restaurant.findById(req.params.id, (err, restaurant) => {
            if (err) {
                res.send(err);
            }
            restaurant.name = req.body.name;
            restaurant.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json(restaurant);
            });
        });
    });

    // 'v1/restaurant/:id' - delete
    api.delete('/:id', (req, res) => {
        Restaurant.remove({
            _id: req.params.id
        }, (err, restaurant) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: "Restaurant successfully removed" });
        });
    });

    // add review for a specific Restaurant
    // 'v1/restaurant/reviews/add/:id'
    api.post('/reviews/add/:id', (req, res) => {
        Restaurant.findById(req.params.id, (err, restaurant) => {
            if (err) {
                res.send(err);
            }
            let newReview = new Review();

            newReview.title = req.body.title;
            newReview.text = req.body.text;
            newReview.restaurant = restaurant._id;

            newReview.save(err => {
                if (err) {
                    res.send(err);
                }
                restaurant.reviews.push(newReview);
                restaurant.save(err => {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ message: 'Restaurant review saved successfully' });
                });
            });
        });
    });

    // get reviews for a particular restaurant
    // 'v1/restaurant/reviews/:id'
    api.get('/reviews/:id', (req, res) => {
        Review.find({ restaurant: req.params.id}, (err, reviews) => {
            if (err) {
                res.send(err);
            }
            res.json(reviews);
        });
    });

    return api;
}