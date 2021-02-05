const express = require('express');

const Routes = () => {
  const router = express.Router();
  router.route('').get((req, res) =>{
    res.json({'hi':'all channels'})
  });

  return router;
}

module.exports = Routes;