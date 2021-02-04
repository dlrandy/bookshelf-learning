if (process.env.NODE_ENV === 'development') {
    module.exports = require('./dev-server.js');
} else if (process.env.NODE_ENV === 'test') {
    module.exports = require('./test-server');
} else {
    module.exports = require('./dev-server');
}
