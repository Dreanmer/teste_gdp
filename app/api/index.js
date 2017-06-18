exports.register = (server, options, next) => {

    server.route([
        { method: 'GET', path: '/', config: require('./handlers/index') }
    ]);

    next();
};

exports.register.attributes = {
    name: 'api'
};