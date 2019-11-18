import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './App.css';
import Header from "./components/header"
import withAuth from "./components/with-auth"
import Homepage from "./pages/home-page"
import Registerpage from "./pages/register-page"
import Loginpage from "./pages/login-page"
import NotFoundpage from "./pages/not-found-page"
import history from "./history"

function App() {
  return (
    <div className="App">
      <Router history={ history }>
        <Header />
        <Switch>
          <Route path="/" exact component={ withAuth(Homepage) } />
          <Route path="/register" component={ Registerpage } />
          <Route path="/login" component={ Loginpage } />
          <Route path="*" component={ NotFoundpage } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
