import React from "react";
import { renderToString } from "react-dom/server";
import { match, RouterContext } from "react-router";
import { Provider } from "react-redux";
import routes from "../../client/routes";
import configureStore from "../../client/common/store/configureStore";

import dva, { connect } from "dva";
import { browserHistory } from 'dva/router';

const app = dva({
    history: browserHistory
    // history: createHistory()
});

// 2. Plugins
// app.use({});

// 3. Model move to router
models.forEach(m => {
    app.model(m);
});

// 4. Router
app.router(require("./client/routes"));

// 5. Start
app.start('#root');

const store = configureStore();

async function clientRoute(ctx, next) {
    let _renderProps;

    match(
        { routes, location: ctx.url },
        (error, redirectLocation, renderProps) => {
            _renderProps = renderProps;
        }
    );

    if (_renderProps) {
        await ctx.render("index", {
            root: renderToString(
                app
            ),
            state: store.getState()
        });
    } else {
        await next();
    }
}

export default clientRoute;
