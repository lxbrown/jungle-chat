const express = require('express');

const interactions = require('./interactions')();

const Routes = () => {
  const router = express.Router();
  router.route('/channel/:channel').get((req, res, next) => {
    interactions.getByChannel(req.params.channel, 20).then(messages => {
      res.json(messages);
    }, err => {
      res.json(err);
    });
  });

  return router;
}

module.exports = Routes;