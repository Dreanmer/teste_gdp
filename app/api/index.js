exports.register = (server, options, next) => {

    server.route([
        { method: 'GET', path: '/', config: require('./handlers/index') },
        { method: 'POST', path: '/checkout', config: require('./handlers/checkout') }
    ]);

    next();
};

exports.register.attributes = {
    name: 'api'
};