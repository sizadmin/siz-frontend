import React, { Suspense, lazy } from "react";
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
import "bootstrap/dist/css/bootstrap.min.css";
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
global.navigate = null;

const Login = lazy(() => import("../pages/authentication/login"));
const Delivery = lazy(() => import("../pages/delivery"));
const Pickup = lazy(() => import("../pages/pickup"));



const NoMatchPage = () => {
  document.body.style.height = "100%";
  return <div className="noPageFound">Page Not found</div>;
};

const ServerError = () => {
  const history = useHistory();
  document.body.style.height = "100%";
  return (
    <>
      <div className="noPageFound">
        <div>
          <h1 className="mb-3"> Something went wrong </h1>
          <h6 className="text-center">
            Please try again or report a issue to support
          </h6>
          {/* <p className="title text-center" ></p> */}
          <br />

          <div className="text-center">
            <Button
              variant="primary"
              onClick={() => {
                history.goBack();
              }}
            >
              Try again
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <div className="app">
      <div>
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
                    <Route  exact path="/schedule/:productId" component={Delivery} />
                    <Route  exact path="/pickup/:productId" component={Pickup} />

                    <Route component={NoMatchPage} />

                  </Switch>
                </Suspense>
              </MyErrorBoundary>
              {/* </MyProvider> */}
            </Router>
          </PersistGate>
        </Provider>
      </div>
    </div>
  );
};

export default App;
