exports.register = (plugin, options, next) => {

    plugin.route([
        {method: 'GET', path: '/', config: require('./handlers/index')}
    ]);

    next();
};

exports.register.attributes = {
    name: 'api'
};