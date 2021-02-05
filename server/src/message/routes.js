const express = require('express');

const repository = require('./repository')();

const Routes = () => {
    const router = express.Router();
    router.route('/channel/:channel').get((req, res, next) => {
        repository.getByChannel(req.params.channel, 20).then(messages => {
            res.json(messages);
        }, err => {
            next(err)
        });
    });

    return router;
}

module.exports = Routes;