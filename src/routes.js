import React from 'react';
import { withRouter, Route, Redirect, Switch, useParams } from 'react-router-dom';
import { connect } from "react-redux";
import App from "./App";
import CreateFormComponent from "./components/CreateFormComponent";
import FormComponent from "./components/FormComponent";
class Routes extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Switch>
                <Route
                    exact={true} path="/"
                    component={App}
                />
                <Route
                    exact={true} path="/createform"
                    component={CreateFormComponent}
                />
                <Route
                    exact={true} path="/form/:formName"
                    component={FormComponent}
                />
            </Switch>
        );

    }
}
function mapState(state) {
    return {};
}
export default connect(mapState)(withRouter(Routes));

