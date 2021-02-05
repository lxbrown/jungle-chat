const express = require('express');

const Repository = require('./repository');
const Controller = require('./controller');

const Routes = () => {
    const controller = Controller(Repository());

    const router = express.Router();
    router.route('/channel/:channel').get(controller.getByChannel);

    return router;
}

module.exports = Routes;