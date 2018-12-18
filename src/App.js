import React, { Component } from 'react';
import './App.css';
import User from './components/user'
import Login from './components/LoginContainer'
import SignUp from './components/SignUpContainer'
import Public from './components/public'
import Home from './components/home'
import { Switch, Route, Redirect } from 'react-router-dom'
import UserContainer from './components/private'

class App extends Component {
  componentDidMount() {
    const element = document.getElementById('startingLoader')
    window.onload = () => {
      if(element) {
        element.remove()
      }
    }
  }

  render() {
    return (
        <div className="container">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/user/:id" component={UserContainer} />
          <Route exact path="/" component={Home} />
          <Route path="/public" component={Public} />
          <Route path="/private" component={User} />
        </Switch> 
        </div>
    );
  }
}

export default App;
