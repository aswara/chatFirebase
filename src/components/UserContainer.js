import React, { Component } from 'react';
import Header from './home/Header';
import { dbfirebase } from '../firebase';
import { Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';

class UserContainer extends Component {
    state={
        pesan: '',
        uid: '',
        data: [],
    }

    componentWillMount(){
        const user = dbfirebase.auth().currentUser;
        if(user) {
            this.setState({  email: user.email, uid: user.uid })
        }    
    }

    componentDidUpdate(){
        this.scrollToBottom()
    }

    componentDidMount() {
        if(this.state.uid){
            this.listChat()
        }
    }

    scrollToBottom =()=>{
        const pesanTerakhir = ReactDOM.findDOMNode(this.pesanTerakhir)
         pesanTerakhir.scrollIntoView()
    }

    handleInputChange=(e)=> {
        this.setState({ pesan: e.target.value })
    }

    handleSubmit=()=> {
        const { pesan, uid } = this.state
        const data = {
            pengirim: uid,
            penerima: this.props.match.params.id,
            pesan: pesan,
            timestap: Date.now()
        }
        dbfirebase.database().ref('message').child(this.state.uid).child(this.props.match.params.id).push(data)
        .then(dbfirebase.database().ref('message').child(this.props.match.params.id).child(this.state.uid).push(data))
        this.setState({ pesan: '' })
    }

    listChat=()=> {
        dbfirebase.database().ref('message').child(this.state.uid).child(this.props.match.params.id).on('value', snapshot=> {
            const data= []
            snapshot.forEach(element=>{
                data.push(element.val())
            })
            this.setState({data})
        })
    }

    render() {
        if(!this.props.match.params.id){return<Redirect to='/' />}
        if(!this.state.uid){return<Redirect to='/' />}
        return (
            <div className="pesan">
                <div className="header container">
                   <h3>{this.props.location.state.user.author || this.props.location.state.user.email }</h3>
                </div>
                <div className="box">
                {
                    this.state.data.map(x=>
                        <div className={`chatbox ${x.pengirim == this.state.uid ? 'right' : 'left'}`}>
                            <h4>{x.pesan}</h4>
                        </div>
                        )
                }
                <div ref={element=>{this.pesanTerakhir = element}} className="inputchat">
                    <textarea
                        onChange={this.handleInputChange}
                        value={this.state.pesan}
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
        );
    }
}

export default UserContainer;