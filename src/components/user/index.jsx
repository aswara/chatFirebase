import React, { Component } from 'react';
import { dbfirebase } from '../../firebase';
import { Link } from 'react-router-dom';
import './user.css'

class RoomChat extends Component {
    state = {
        users: [],
        user: ''
    }

    componentDidMount(){
        this.dataUser()
    }

    dataUser=()=> {
        dbfirebase.database().ref('users').on('value', snapshot => {
            const users = [];
            snapshot.forEach(element => {
                const user = element.val()
                users.push(user)
            });
            this.setState({users})
        })
    }



    render() {
        return (
            <div className="user">
                <div className="header">
                    <span>Teman</span>
                </div>
                <div className="">
                { this.state.users.map(user=>{
                    return(
                       <div className="email">
                            <Link style={{ textDecoration: 'none', color: 'white' }} to={{
                                pathname: `user/${user.uid}`,
                                state: { user }
                            }}><span>{user.email}</span></Link>
                       </div>
                    )
                }) 
                }
                </div>

            </div>
        );
    }
}

export default RoomChat;