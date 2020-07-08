const guest = require('./authenticate')
const loggedIn = require('./redirectIfAuthenticated')

exports.guest = guest
exports.loggedIn = loggedIn