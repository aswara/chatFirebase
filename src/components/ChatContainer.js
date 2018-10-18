import React, { Component } from 'react';
import { dbfirebase } from '../firebase';
import Header from './home/Header';
import { Link, Redirect } from 'react-router-dom';

class ChatContainer extends Component {
    state={ 
        user:null,
        newMessage: '',
        redirect: false,
        keluar: false
    }

    onMessage = snapshot => {
        const messages = Object.keys(snapshot.val()).map(key => {
            const msg = snapshot.val()[key];
            msg.id = key
            return msg
        })
        this.setState({ messages })
    }

    componentDidMount() {
        dbfirebase.auth().onAuthStateChanged((user) => {
            if (user) {
            this.setState({ user });
            } else {
            
            }
        });

        const user = dbfirebase.auth().currentUser;

        if (user) {
        dbfirebase.database().ref('users').child(user.uid).update({
            username: user.displayName,
            email: user.email,
            uid: user.uid,
        })
        } else {
            this.setState({
                redirect: true
            })
        }

        dbfirebase.database().ref('messages').on('value', snapshot => {
            this.onMessage(snapshot)
        })
    }

    handleLogout =()=> {
        dbfirebase.auth().signOut()
        .then( this.setState({ keluar: true }) )
    }

    handleInputChange = e => {
        this.setState({ newMessage: e.target.value });
    };

    handleSubmit = () => {
        const { newMessage, user } = this.state
        const data = {
            author: user.email,
            message: newMessage,
            user_id: user.uid,
            timestap: Date.now()
        }
        dbfirebase.database().ref('messages/').push(data);
        this.setState({
            newMessage: ''
        })
    } 
    
    render() {
        if(this.state.redirect){return<Redirect to='/login' />}
        if(this.state.keluar){return<Redirect to='/login' />}
        return (
            <div className="home">
                <div className="header-home">
                    <h2>Forum Berbagi</h2>
                    <button className="btn btn-success" onClick={this.handleLogout}>Keluar</button>
                <Link to={`/room`}><button className="btn btn-primary">Anggota</button></Link>
                </div>
                <div>
                    { 
                        this.state.messages && this.state.messages.map((pesan,i)=> (
                            <div key={pesan.id}
                            className={`message ${this.props.user.email === pesan.author && 'mine'}` }
                            >
                                <h4>{pesan.message}{i+1}</h4>

                                <Link to={{
                                pathname: `user/${pesan.user_id}`,
                                state: { user: pesan }
                            }}><h6>{pesan.author}</h6></Link>
                            </div>
                        ) )
                    }
                </div>

                <div id="chat-input">
                    <textarea
                    onChange={this.handleInputChange}
                    value={this.state.newMessage}
                    placeholder="Add your message..." />
                    <button
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                    >
                        kirim
                    </button>
                </div>
            </div>
        );
    }
}

export default ChatContainer;