const express = require('express');

const interactions = require('./interactions')();

const Routes = () => {
  const router = express.Router();
  router.route('').get((req, res, next) => {
    interactions.getAll().then(channels => {
      res.json(channels);
    }, err => {
      res.json(err);
    });
  });
  // Disabling the ability to create channels via an HTTP request. For
  // now, those can only be created internally.
  // router.route('').post((req, res, next) => {
  //   const { short_name, display_name, description, persistent } = req.body;
  //   interactions.createChannel(short_name, display_name, description, persistent).then(channel => {
  //     res.json(channel);
  //   }, err => {
  //     res.json(err);
  //   });
  // })

  return router;
}

module.exports = Routes;