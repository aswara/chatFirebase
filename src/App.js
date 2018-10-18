import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/LoginContainer';
import SignUp from './components/SignUpContainer';
import ChatContainer from './components/ChatContainer';
import Room from './components/RoomChat';
import { dbfirebase } from './firebase';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserContainer from './components/UserContainer';

class App extends Component {
  state={
    user: [{
      email: ''
    }]
  }

  componentDidMount() {
    dbfirebase.auth().onAuthStateChanged((user) => {
        if (user) {
        this.setState({ user });
        } else {
        console.log('belum masuk')
        }
    });
  }

  render() {
    return (
        <div className="container">
        <Switch>
          <Route exact={true} path="/" render={()=>(<ChatContainer user={this.state.user} />) } />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/user/:id" component={UserContainer} />
          <Route path="/room" component={Room} />>
        </Switch> 
        </div>
    );
  }
}

export default App;
