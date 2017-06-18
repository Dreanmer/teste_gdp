module.exports = {
    tags: ['api'],
    validate: {},
    handler: (request, reply) => {
        return reply({
            result: 'Hello hapi!'
        });
    }
};