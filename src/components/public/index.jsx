import React, { Component } from 'react';
import { dbfirebase } from '../../firebase';
import { Link, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './public.css'

class ChatContainer extends Component {
    state={ 
        user:{
            email: null
        },
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


    scrollToBottom =()=>{
        const pesanTerakhir = ReactDOM.findDOMNode(this.pesanTerakhir)
        pesanTerakhir.scrollIntoView()
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    componentWillMount() {
        dbfirebase.auth().onAuthStateChanged((user) => {
            if (user) {
            this.setState({ user });
            } else {
            
            }
        });

        const user = dbfirebase.auth().currentUser;

        if (user) {
            this.setState({user})
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
        console.log(this.state)
        return (
            <div className="public">
                <div className="header">
                    <span>{this.state.user.email}</span>
                </div>
                <div className="box">
                { 
                    this.state.messages && this.state.messages.map((pesan,i)=> (
                        <div
                        key={pesan.id}
                        className={`chatbox ${this.state.user.email === pesan.author ? 'right' : 'left'}` }
                        >
                        <div className="message">

                            <Link style={{fontSize: '14px', textDecoration: 'none', color: '#505050'}} to={{
                            pathname: `user/${pesan.user_id}`,
                            state: { user: pesan }
                            }}><span>{pesan.author}</span></Link>
                            <div className="text">
                                <span>{pesan.message}{i+1}</span>
                            </div>

                        </div>
                        </div>
                    ) )
                }
                    <div ref={element=>{this.pesanTerakhir = element}} className="inputchat">
                        <input
                        onChange={this.handleInputChange}
                        value={this.state.newMessage}
                        placeholder="Ketik pesan" />
                        <button
                        className="btn btn-primary"
                        onClick={this.handleSubmit}
                        >
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatContainer;