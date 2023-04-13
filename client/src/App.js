import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Trains from "./components/Trains/Trains";
import Login from "./components/User/Login";
import { useEffect } from "react";
import Logout from "./components/User/Logout";
import { useDispatch } from "react-redux";
import { check } from "./actions/user";
import Cookies from "js-cookie";
import Profile from "./components/Profile/Profile";
import Signup from "./components/User/Signup";
import Admin from "./components/Admin/Admin";
import NotFound from "./components/NotFound/NotFound";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import ViewAllBookings from "./components/ViewAllBookings/ViewAllBookings";

const App = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(check());
    } else {
      console.log("Please Login to continue");
    }
  });

  return (
    <Router>
      {/* Navbar */}
      <Navbar />

      <Switch>
        {/* Train List */}
        <Route exact path="/">
          <Trains />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/logout">
          <Logout />
        </Route>

        <Route exact path="/signup">
          <Signup />
        </Route>

        <Route exact path="/admin">
          <Admin />
        </Route>

        <Route exact path="/profile">
          <Profile />
        </Route>

        <Route exact path="/changepassword">
          <ChangePassword />
        </Route>
        <Router exact path="/viewallbookings">
          <ViewAllBookings />
        </Router>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
