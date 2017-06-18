const Glue = require('glue');

var manifest = {
    server: {
        app: {
            slogan: "GDP Test"
        }
    },
    connections: [{
        port: 3000
    }],
    registrations: [
        { plugin: 'inert' },
        { plugin: 'vision' },
        {
            plugin: {
                register: 'hapi-swaggered',
                options: {
                    info: {
                        title: 'GDP Test - API',
                        description: 'Powered by node, hapi, joi, hapi-swaggered, hapi-swaggered-ui and swagger-ui',
                        version: '1.0'
                    }
                }
            }
        },
        {
            plugin: {
                register: 'hapi-swaggered-ui',
                options: {
                    title: 'Documentation',
                    path: '/docs',
                    swaggerOptions: {}
                }
            }
        },
        {
            plugin: './api',
            options: { routes: { prefix: '/api' } }
        },
    ]
};

Glue.compose(manifest, { relativeTo: __dirname + '/app' }, (err, server) => {
    server.start((err) => {
        console.log('Server running at: %s://%s:%s', server.info.protocol, server.info.address, server.info.port);
    });
});