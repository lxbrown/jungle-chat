const express = require('express');
const messageRoutes = require('./message/routes');
const channelRoutes = require('./channel/routes');

const Routes = () => {
  const router = express.Router();
  router.use('/message', messageRoutes());
  router.use('/channel', channelRoutes());
  return router;
}

module.exports = Routes;