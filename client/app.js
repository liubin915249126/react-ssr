import React from "react";
import { Switch, Route } from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Switch>
                <Route
                    path="/"
                    component={require("./common/containers/Root").default}
                    exact
                />
                <Route
                    path="/home"
                    component={require("./home/containers/App").default}
                />
                <Route
                    path="/explore"
                    component={require("./explore/containers/App").default}
                />
                <Route
                    path="/about"
                    component={require("./about/containers/App").default}
                />
            </Switch>
        );
    }
}
export default App;
