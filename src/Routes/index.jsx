import React, { Component } from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import asyncComponent from "@Utils/lazyLoadingComponent";
import { connect } from "react-redux";

const LoginComponent = asyncComponent(() =>
  import("@container/LoginContainer").then((module) => module.default)
);
const ContactContainer = asyncComponent(() =>
  import("@container/ContactContainer").then((module) => module.default)
);
 class RouterComponent extends Component {
    render() {
      return (
        <Router>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/login" />
            </Route>
            <Route
            path="/login"
            name="LoginComponent"
            component={LoginComponent}
            />
            <PrivateRoute
            path="/contacts"
            exact
            authenticated={this.props.authenticated}
            component={ContactContainer}
          />
            </Switch>
      </Router>
    );
  }
}
const mapStateToProps = (state) => ({
  authenticated: state?.LoggedInUserData?.loggednUserData?.id?true:false,
});

export default connect(mapStateToProps)(RouterComponent);

function PrivateRoute({ component: Container, authenticated }) {
    return (
      <Route
        render={(props) =>
          authenticated ? (
            <Container {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )
        }
      />
    );
  }
  