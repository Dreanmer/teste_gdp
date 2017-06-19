const customers = require('../data/customers.json');

module.exports.list = {
    tags: ['api'],
    description: 'get customers list',
    handler: (request, reply) => {
        reply(customers);
    }
};