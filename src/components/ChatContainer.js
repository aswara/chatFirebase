import React, { Component } from 'react';
import { dbfirebase } from '../firebase';
import Header from './home/Header';
import { Link, Redirect } from 'react-router-dom';
import Room from '../components/RoomChat';
import ReactDOM from 'react-dom';


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
        if(this.state.redirect){return<Redirect to='/login' />}
        if(this.state.keluar){return<Redirect to='/login' />}
        return (
            <div className="pesan">
                <div className="header row">
                    <div className="col-6 row">
                        <h2>Forum Berbagi</h2>
                    </div>
                    <div className="col-6 keluar row">
                        <h3>{this.state.user.email}</h3>
                        <button className="btn btn-success ml-3" onClick={this.handleLogout}>Keluar</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                    <Link to={`/room`}><button className="btn btn-primary my-1">Anggota</button></Link>
                        <Room />
                    </div>
                    <div className="col-md-9">
                        <div className="box">
                        { 
                            this.state.messages && this.state.messages.map((pesan,i)=> (
                                <div key={pesan.id}
                                className={`chatbox ${this.props.user.email === pesan.author ? 'right' : 'left'}` }
                                >
                                    <h4>{pesan.message}{i+1}</h4>

                                    <Link to={{
                                    pathname: `user/${pesan.user_id}`,
                                    state: { user: pesan }
                                }}><h6>{pesan.author}</h6></Link>
                                </div>
                            ) )
                        }
                        <div ref={element=>{this.pesanTerakhir = element}} className="inputchat">
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
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatContainer;