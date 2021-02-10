const express = require('express');

const interactions = require('./interactions')();

const Routes = () => {
  const router = express.Router();
  router.route('/channel/:channel').get((req, res, next) => {
    const limit = parseInt(req.query.limit);
    const from = req.query.from;

    interactions.getByChannel(req.params.channel, limit, from).then(messages => {
      res.json(messages);
    }, err => {
      res.json(err);
    });
  });

  return router;
}

module.exports = Routes;