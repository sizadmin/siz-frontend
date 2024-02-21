import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import "./App.css";
import "rsuite/dist/rsuite.min.css";
import "react-activity/dist/library.css";
// import PrivateRoute from "./PrivateRoute";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import MyErrorBoundary from "./MyErrorBoundary";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../../utils/redux/store";
import ForgetPassword from "../pages/authentication/forgetPassword";
import ResetPassword from "../pages/authentication/resetPassword";

// import AdminRoute from "./AdminRoute";
import { Button } from "react-bootstrap";

// import AdminStaffRoute from "./AdminStaffRoute";
import ActivityLoader from "../atom/ActivityLoader/ActivityLoader";
import { ThemeProvider } from "../organisms/ThemeProvider/ThemeProvider";
import { ServerError } from "../pages/ServerError/ServerError";
import { NoMatchPage } from "../pages/NoMatchPage/NomatchPage";
import DrycleanerOrders from "../pages/drycleanerOrders";
import Profile from "../pages/Profile/Profile";
global.navigate = null;

const Login = lazy(() => import("../pages/authentication/login"));
const Delivery = lazy(() => import("../pages/delivery"));
const Pickup = lazy(() => import("../pages/pickup"));
const ReturnPickup = lazy(() => import("../pages/returnpickup"));
const Dashboard = lazy(() => import("../pages/dashboard"));
const LenderSignup = lazy(() => import("../pages/lendersignup"));
const DashboardNew = lazy(() => import("../pages/dashboardNew"));

const App = () => {
  return (
    <ThemeProvider>
      <div className="app">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
              {/* <MyProvider> */}
              <MyErrorBoundary>
                <Suspense
                  fallback={
                    <div
                      className={
                        "loaderBackground d-flex justify-content-center"
                      }
                    >
                      <ActivityLoader show={true} />
                    </div>
                  }
                >
                  <Switch>
                    <Route exact restricted path="/" component={Login} />
                    <Route
                      exact
                      restricted
                      path="/forgetPassword"
                      component={ForgetPassword}
                    />
                    <Route
                      exact
                      restricted
                      path="/resetpassword"
                      component={ResetPassword}
                    />
                    <Route exact path="/error" component={ServerError} />
                    <Route
                      exact
                      path="/delivery/:productId"
                      component={Delivery}
                    />
                    <Route exact path="/pickup/:productId" component={Pickup} />
                    <Route
                      exact
                      path="/returnpickup/:productId"
                      component={ReturnPickup}
                    />
                    <Route exact path="/users" component={LenderSignup} />
                    <Route exact path="/dashboard" component={DashboardNew} />

                    <Route exact path="/drycleaner" component={DrycleanerOrders} />
                    <Route exact path="/orders" component={Dashboard} />
                    <Route exact path="/profile" component={Profile} />

                    <Route component={NoMatchPage} />
                  </Switch>
                </Suspense>
              </MyErrorBoundary>
              {/* </MyProvider> */}
            </Router>
          </PersistGate>
        </Provider>
      </div>
    </ThemeProvider>
  );
};

export default App;
