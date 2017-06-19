const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Customer = require('../../../app/api/modules/customer');
const customers = require('./mocks/customers.mock.json');

lab.experiment('customer', () => {

    lab.test('load a customer', (done) => {
        this.customer = new Customer('Unilever', customers);
        Lab.expect(this.customer.get()).to.equal({
            "name": "Unilever",
            "rules": [
                {
                    "type": "buyXgetY",
                    "parameters": {
                        "applies": "classic",
                        "buyAmount": 3,
                        "payAmount": 2
                    }
                }
            ]
        });
        done();
    });

    lab.test('load inexistent', (done) => {
        try {
            this.customer = new Customer('invalid', customers);
        } catch (e) {
            Lab.expect(e.isBoom).to.be.true();
            Lab.expect(e.output.statusCode).to.equal(404);
        }
        done();
    });

    lab.test('get discount rules', (done) => {
        this.customer = new Customer('Unilever', customers);
        Lab.expect(this.customer.getRules()).to.equal([
            {
                "type": "buyXgetY",
                "parameters": {
                    "applies": "classic",
                    "buyAmount": 3,
                    "payAmount": 2
                }
            }
        ]);
        done();
    });
});