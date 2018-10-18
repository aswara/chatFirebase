import React, { Component } from 'react';
import { dbfirebase } from '../firebase';
import { Link } from 'react-router-dom';

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

    hubungi(user) {
        this.setState({ user })
    }

    render() {
        return (
            <div className="row">
                <div className="col-4">
                { this.state.users.map(user=>{
                    return(
                       <div>
                           <a onClick={()=>this.hubungi(user)}>{user.email}</a>
                            <Link to={{
                                pathname: `user/${user.uid}`,
                                state: { user }
                            }}><p>{user.email}</p></Link>
                       </div>
                    )
                }) 
                }
                </div>
                <div className="col-8">
                </div>

            </div>
        );
    }
}

export default RoomChat;