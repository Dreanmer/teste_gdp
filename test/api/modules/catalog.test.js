const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Catalog = require('../../../app/api/modules/catalog');
const products = require('./mocks/products.mock.json');

lab.experiment('catalog', () => {
    lab.before((done) => {
        this.catalog = new Catalog(products);
        done();
    });

    lab.test('get a product', (done) => {
        Lab.expect(this.catalog.get('classic')).to.equal({
            "id": "classic",
            "name": "Classic Ad",
            "price": 269.99
        });
        done();
    });

    lab.test('get inexistent product', (done) => {
        Lab.expect(this.catalog.get('invalid')).to.equal(null);
        done();
    });
});