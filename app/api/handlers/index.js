module.exports.index = {
    tags: ['api'],
    description: 'health check route',
    handler: (request, reply) => {
        return reply({
            api: {
                status: 'online'
            }
        });
    }
};