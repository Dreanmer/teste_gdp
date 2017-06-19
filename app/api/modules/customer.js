const Boom = require('boom');

class Customer {

    constructor(name, dataSource) {
        this.customers = dataSource || require('../data/customers.json');
        this.customer = this.load(name);
    }

    /**
     * load a customer by name
     *
     * @param name
     * @returns {customer}|null
     */
    load(name) {
        const customer = (this.customers.find((c) => c.name == name));

        if (!customer)
            throw Boom.notFound('customer not found');

        return customer;
    }

    /**
     * get loaded customer
     *
     * @returns {customer}
     */
    get() {
        return this.customer;
    }

    /**
     * get discountRules for this customer
     *
     * @returns [rules]
     */
    getRules() {
        return this.customer.rules;
    }
}

module.exports = Customer;