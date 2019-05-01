// Hook for server
// if (typeof require.ensure !== 'function') {
//     require.ensure = function(dependencies, callback) {
//         callback(require)
//     }
// }
import {Redirect} from 'react-router-dom'

const routes = [
    // childRoutes: [{
        {path: '/',
        component: require('./common/containers/Root'),
        childRoutes: [
            {
                path: 'home',
                component:require('./home/containers/App')
            },
            {
            path: 'explore',
            component:require('./explore/containers/App')
        }, {
            path: 'about',
            component:require('./about/containers/App')
            // getComponent(nextState, callback) {
            //     require.ensure([], require => {
            //         callback(null, require('./about/containers/App'))
            //     }, 'about')
            // }
        }]}
    // }]
    ]

export default routes
