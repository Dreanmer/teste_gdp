exports.register = (server, options, next) => {

    server.route([
        { method: 'GET', path: '/', handler: { file: './public/index.html' } },
        { method: 'GET', path: '/admin', handler: { file: './public/admin.html' } }
    ]);

    next();
};

exports.register.attributes = {
    name: 'front'
};