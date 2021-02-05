module.exports = (repository) => {
    const getByChannel = (req, res, next) => {
        repository.getByChannel(req.params.channel, 20).then(messages => {
            res.json(messages);
        }, err => {
            next(err)
        });
    }

    return {
        getByChannel
    }
}