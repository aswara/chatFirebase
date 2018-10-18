import React, { Component } from 'react';
import { dbfirebase } from '../firebase';

class SignUpContainer extends Component {
    state = {
        email: '',
        password: '',
        error: ''
    }

    handleChange =(e)=> {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit =()=> {
        const { email, password } = this.state
        if ( email && password ) {
            this.signup()
        } else {
            this.setState({ error: 'tidak boleh kosong' })
        }
    }

    signup() {
        const { email, password } = this.state
        dbfirebase.auth().createUserWithEmailAndPassword(email,password)
        .then(res => {
            this.onLogin()
        })
        .catch(err => {
            console.log(err)
        })
    }

    onLogin() {
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <h3>Daftar</h3>
                <p>{this.state.error}</p>
                <input
                type="text"
                name="email"
                className="form-control"
                onChange={this.handleChange}
                value={this.state.email}
                placeholder="Masukan Email"
                />
                <input
                type="password"
                name="password"
                className="form-control"
                onChange={this.handleChange}
                value={this.state.pasword}
                placeholder="Masukan Password"
                />
                
                <button className="btn btn-primary" onClick={this.handleSubmit}>Daftar</button>
            </div>
        );
    }
}

export default SignUpContainer;