import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class AppRouter extends React.Component {
  render() {
    return (
        <Router>
          <div className="app">
            <nav className="main-nav">
              <Link to="/">home</Link>
              <Link to="/login">login</Link>
              <Link to="/register">register</Link>
            </nav>
            <Switch>
              <Route exact path="/" component={App} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </Router>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppRouter />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
