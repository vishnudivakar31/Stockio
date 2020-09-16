import React from 'react';
import SecurityPage from './containers/SecurityPage'
import HomePage from './containers/HomePage'
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
      <Route path="/stockio">
        <HomePage />
      </Route>
    </Router>
  );
}

export default App;
