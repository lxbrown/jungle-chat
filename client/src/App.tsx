import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Launch from './Launch';
import Channel from './Channel';

import './App.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Launch />
        </Route>
        <Route exact path="/:channel">
          <Channel />
        </Route>
      </Switch>
    </Router>
  );
}
