exports.register = (server, options, next) => {

    server.route([
        { method: 'GET', path: '/', config: require('./handlers/index').index },
        { method: 'POST', path: '/checkout', config: require('./handlers/checkout').checkout },
        { method: 'GET', path: '/customers', config: require('./handlers/customers').list },
        { method: 'GET', path: '/products', config: require('./handlers/products').list },
    ]);

    next();
};

exports.register.attributes = {
    name: 'api'
};