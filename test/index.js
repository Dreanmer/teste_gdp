const Lab = require('lab');
const lab = exports.lab = Lab.script();

lab.experiment('with only', () => {

    lab.test('example test', (done) => {

        Lab.expect(1 + 1).to.equal(2);
        done();
    });
});