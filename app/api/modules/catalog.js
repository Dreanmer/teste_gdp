const products = require('../data/products.json');

class Catalog {

    constructor(dataSource) {
        this.products = dataSource || products;
    }

    /**
     * get product by id
     *
     * @param id
     * @returns {object}|null
     */
    get(id) {
        const product = (this.products.find((p) => p.id == id));

        if (!product)
            return null;

        return Object.assign({}, product)
    }
}

module.exports = Catalog;