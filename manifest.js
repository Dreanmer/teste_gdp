const manifest = {
    server: {
        app: {
            slogan: 'GDP Test'
        }
    },
    connections: [
        {
            port: 3000,
            routes: {
                files: {
                    relativeTo: __dirname + '/app/front'
                }
            }
        }
    ],
    registrations: [
        {
            plugin: 'inert'
        },
        {
            plugin: 'vision'
        },
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
            options: {
                routes: {
                    prefix: '/api'
                }
            }
        },
        {
            plugin: './front'
        }
    ]
};

module.exports = manifest;