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



    render() {
        return (
            <div className="row">
                <div className="">
                { this.state.users.map(user=>{
                    return(
                       <div>
                            <Link to={{
                                pathname: `user/${user.uid}`,
                                state: { user }
                            }}><h4 className="list-group-item mb-2 shadow">{user.email}</h4></Link>
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