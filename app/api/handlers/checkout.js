const Boom = require('boom');
const Joi = require('joi');
const Catalog = require('../modules/catalog');
const Checkout = require('../modules/checkout');
const products = require('../data/products');
const customers = require('../data/customers');

module.exports = {
    tags: ['api'],
    description: 'checkout route',
    notes: 'expects a valid customer id and a items list',
    validate: {
        payload: Joi.object().keys({
            customer: Joi.string().required(),
            items: Joi.array().required()
        })
    },
    handler: (request, reply) => {
        const customer = customers.find((customer) => {
            return customer.name == request.payload.customer;
        });

        if (!customer)
            return reply(Boom.badRequest('Inexistent customer'));

        const catalog = new Catalog(products);
        const checkout = new Checkout(customer, catalog);

        request.payload.items.forEach((item) => {
            checkout.add(item);
        });

        const total = checkout.total();
        return reply({ total });
    }
};