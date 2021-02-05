import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Launch from './launch/Launch';
import Chat from './chat/Chat';

import './App.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Launch />
        </Route>
        <Route exact path="/:channel">
          <Chat />
        </Route>
      </Switch>
    </Router>
  );
}
