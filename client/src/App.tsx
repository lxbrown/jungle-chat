import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Launch from './Launch';
import Channel from './Channel';

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
