import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../utils/redux/actions";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = rest?.user?.userInfo.token;
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default connect((state) => ({ user: state.user }), {
  setUser,
})(withRouter(PrivateRoute));
