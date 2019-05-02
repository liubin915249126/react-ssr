import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom";
import {Provider} from 'react-redux'
import App from './app'

import configureStore from './common/store/configureStore'

const store = configureStore() //window.REDUX_STATE


// match({history: browserHistory, routes}, (error, redirectLocation, renderProps) => {
    ReactDOM.hydrate(
        <Provider store={store}>
            <Router>
              <App />
            </Router>
        </Provider>
        ,
        document.getElementById('root')
    )
// })
