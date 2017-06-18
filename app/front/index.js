exports.register = (server, options, next) => {

    server.route([
        {
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: './public',
                    redirectToSlash: true,
                    index: true
                }
            }
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'front'
};