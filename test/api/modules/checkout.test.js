const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Customer = require('../../../app/api/modules/customer');
const Catalog = require('../../../app/api/modules/catalog');
const Checkout = require('../../../app/api/modules/checkout');
const products = require('./mocks/products.mock.json');
const customers = require('./mocks/customers.mock.json');

lab.experiment('checkout', () => {
    lab.before((done) => {
        this.catalog = new Catalog(products);

        done();
    });

    lab.test('add a product', (done) => {
        const customer = new Customer('default', customers);
        const checkout = new Checkout(customer, this.catalog);
        checkout.add('classic');
        checkout.add('standout');

        Lab.expect(checkout.items).to.equal([{
            "id": "classic",
            "name": "Classic Ad",
            "price": 269.99
        }, {
            "id": "standout",
            "name": "Standout Ad",
            "price": 322.99
        }]);

        done();
    });

    lab.test('add a inexistent product', (done) => {
        const customer = new Customer('default', customers);
        const checkout = new Checkout(customer, this.catalog);

        try {
            checkout.add('invalid');
        } catch (e) {
            Lab.expect(e.isBoom).to.be.true();
            Lab.expect(e.output.statusCode).to.equal(404);
        }

        done();
    });

    lab.test('get total', (done) => {
        const customer = new Customer('Unilever', customers);
        const checkout = new Checkout(customer, this.catalog);
        checkout.add('classic');
        checkout.add('standout');

        Lab.expect(checkout.total()).to.equal(592.98);
        done();
    });

    lab.test('discount - buy X get Y', (done) => {
        const customer = new Customer('Unilever', customers);
        const checkout = new Checkout(customer, this.catalog);
        checkout.add('classic');
        checkout.add('classic');
        checkout.add('classic');

        Lab.expect(checkout.total()).to.equal(539.98);
        done();
    });

    lab.test('discount - price drops', (done) => {
        const customer = new Customer('Apple', customers);
        const checkout = new Checkout(customer, this.catalog);
        checkout.add('standout');

        Lab.expect(checkout.total()).to.equal(299.99);
        done();
    });

    lab.test('mixed discount', (done) => {
        const customer = new Customer('ford', customers);
        const checkout = new Checkout(customer, this.catalog);
        checkout.add('premium');
        checkout.add('premium');
        checkout.add('premium');
        checkout.add('standout');
        checkout.add('standout');
        checkout.add('standout');
        checkout.add('classic');
        checkout.add('classic');
        checkout.add('classic');

        Lab.expect(checkout.total()).to.equal(2909.91);
        done();
    });

});