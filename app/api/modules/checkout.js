const Boom = require('boom');

class Checkout {

    constructor(customer, catalog) {
        this.customer = customer;
        this.catalog = catalog;
        this.items = [];
    }

    /**
     * add an product to the purchase
     *
     * @param id
     */
    add(id) {
        const product = this.catalog.get(id);

        if (!product)
            throw Boom.badData('Invalid product id');

        this.items.push(product);
    }

    /**
     * returns the purchase total
     *
     * @returns {number}
     */
    total() {
        let total = 0;
        const rules = this.customer.rules;

        if (rules && rules.length > 0)
            rules.forEach((rule) => {
                try {
                    this.items = this['_' + rule.type](rule.parameters, this.items);
                } catch (e) {
                    throw Boom.wrap(e, 500);
                }
            });

        this.items.forEach((item) => {
            total += item.price;
        });

        return total;
    }

    /**
     * expected 'params':
     *   {
     *     "applies": "classic",
     *     "buyAmount": 5,
     *     "payAmount": 4
     *   }
     *
     * @param params
     * @param items
     * @returns items
     * @private
     */
    _buyXgetY(params, items) {
        let i = 0;
        return items.map((item) => {
            if (item.id == params.applies) {
                i++;
                if (i == params.buyAmount) {
                    const discount = item.price * (params.buyAmount - params.payAmount);
                    item.price = item.price - discount;
                    i = 0;
                }
            }
            return item;
        })
    }

    /**
     * expected 'params':
     *   {
     *     "applies": "standout",
     *     "min": 1,
     *     "newPrice": 309.99
     *   }
     *
     * @param params
     * @param items
     * @returns items
     * @private
     */
    _priceDrops(params, items) {
        let i = 0;
        const applyDiscount = items.some((item) => {
            if(item.id == params.applies)
                i++;
            return i >= params.min;
        });

        if(applyDiscount)
            return items.map((item) => {
                if (item.id == params.applies)
                    item.price = params.newPrice;
                return item;
            });

        return items;
    }
}

module.exports = Checkout;