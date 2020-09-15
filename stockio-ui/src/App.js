import React from 'react';
import SecurityPage from './containers/SecurityPage'
import Dashboard from './containers/Dashboard'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Route path="/">
        <Redirect to="/lobby" />
      </Route>
      <Route path="/lobby">
        <SecurityPage />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </Router>
  );
}

export default App;
