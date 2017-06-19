const Joi = require('joi');
const Catalog = require('../modules/catalog');
const Customer = require('../modules/customer');
const Checkout = require('../modules/checkout');

module.exports.checkout = {
    tags: ['api'],
    description: 'checkout route',
    notes: 'expects a customer id and items list',
    validate: {
        payload: Joi.object().keys({
            customer: Joi.string().required(),
            items: Joi.array().required()
        })
    },
    handler: (request, reply) => {
        try {
            const catalog = new Catalog();
            const customer = new Customer(request.payload.customer);
            const checkout = new Checkout(customer, catalog);

            request.payload.items.forEach((item) => {
                checkout.add(item);
            });

            const total = checkout.total();
            return reply({ total });

        } catch (e) {
            if(!e.isBoom)
                e = Boom.wrap(e, 500);

            reply(e)
        }
    }
};