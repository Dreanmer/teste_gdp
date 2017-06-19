const Catalog = require('../modules/catalog');

module.exports.list = {
    tags: ['api'],
    description: 'get products list',
    handler: (request, reply) => {
        const catalog = new Catalog();
        reply(catalog.products);
    }
};