const express = require('express');

const Routes = () => {
    const router = express.Router();
    router.route('/channel/:channel').get((req, res) =>{
        res.json({'hi': `get last XXX messages from ${req.params.channel}`})
        // Message.find({
        //   channel_id: req.params.channel
        // }).
        // limit(10).
        // sort('+created_at'), (err, messages) => {
        //   res.json(messages);
        // };
    });

    return router;
}

module.exports = Routes;