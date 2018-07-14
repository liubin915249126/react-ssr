const routes = require('next-routes')

module.exports = routes()                          
.add('user', '/user/:id', 'profile')                // user   profile   /user/:id