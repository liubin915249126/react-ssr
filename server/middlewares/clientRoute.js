import React from 'react'
import {renderToString} from 'react-dom/server'
import { StaticRouter } from "react-router-dom";
import {Provider} from 'react-redux'

import configureStore from '../../client/common/store/configureStore'
import App from '../../client/app'

// const React = require('react')
// const renderToString = require('react-dom/server')
// const {match, RouterContext} = require('react-router')
// const {Provider} = require('react-redux')
// const routes = require('../../client/routes')
// const configureStore = require('../../client/common/store/configureStore')


const store = configureStore()


async function clientRoute(ctx, next) {
    let _renderProps
    const context = { };
    // match({routes, location: ctx.url}, (error, redirectLocation, renderProps) => {
    //     _renderProps = renderProps
    // })

    if (true) {
        await ctx.render('index', {
            root: renderToString(
                <Provider store={store}>
                  <StaticRouter location={ctx.url} context={context}>
                    <App />
                  </StaticRouter>
                </Provider>
            ),
            state: store.getState()
        })
        await next()
    } else {
        await next()
    }
}

export default clientRoute
// module.exports = clientRoute
