import mongoose from 'mongoose';
import { Router } from 'express';
import Restaurant from '../models/restaurant';

export default({ config, db }) => {

    let api = Router();

    // '/v1/restaurant/add'
    api.post('/api', (req, res) => {

        let newRest = new Restaurant();
        newRest.name = req.body.name;

        newRest.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Restaurant saved successfully' });
        });
    });

    // '/v1/restaurant
    api.get('/', (req, res) => {
        Restaurant.find({}, (err, restaurants) => {

            if (err) {
                res.send(err);
            }
            res.json(restaurants);
        });
    });

    // 'v1/restaurant/:id'
    api.get('/:id', (req, res) => {
        Restaurant.findById(req.params.id, (err, restaurant) => {

            if (err) {
                res.send(err);
            }
            res.json(restaurant);
        });
    });

    return api;
}