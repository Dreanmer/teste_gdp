const Glue = require('glue');
const manifest = require('./manifest.js');

Glue.compose(manifest, { relativeTo: __dirname + '/app' }, (err, server) => {
    server.start((err) => {
        console.log('Server running at: %s://%s:%s', server.info.protocol, server.info.address, server.info.port);
    });
});