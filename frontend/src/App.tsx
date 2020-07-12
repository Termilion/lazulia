import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "react-use-auth";
import React from 'react';

import Index from "./pages/index";
import About from "./pages/about";
import TechBlog from "./pages/tech";
import Callback from "./pages/auth0_callback";

import "bootstrap/dist/css/bootstrap.min.css"

function navigate(path: string) {
	console.log(`navigating to ${path}`);
	window.location.href=path;
}

function App() {
  return (
    <AuthProvider
				navigate={navigate}
				auth0_domain="lazulia.eu.auth0.com"
				auth0_client_id="QaxEO7QiUDMqiC644si227BV0z2ppRCB"
				auth0_audience_domain="lazulia.eu.auth0.com"
				auth0_params={{}}
				customPropertyNamespace=""
		>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Index />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/tech">
              <TechBlog />
            </Route>
            <Route path="/other">
              <TechBlog />
            </Route>
            <Route path="/auth0_callback">
              <Callback />
            </Route>
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
