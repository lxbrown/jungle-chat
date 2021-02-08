import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Launch from './launch/Launch';
import Chat from './chat/Chat';

import './App.css';

export default function App() {
  return (
    <Router>
      <Navbar bg="light" expand="sm" fixed="top">
        <Navbar.Brand as={Link} to="/">
          <img
            alt=""
            src="/tree.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Jungle Chat
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav>
            <Nav.Link href="https://github.com/lxbrown/jungle-chat" target='_blank' rel='noreferrer'>Source</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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
