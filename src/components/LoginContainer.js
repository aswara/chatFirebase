import React, { Component } from 'react';
import { dbfirebase } from '../firebase';
import { Link } from 'react-router-dom';

class LoginContainer extends Component {
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
            this.login()
        } else {
            this.setState({ error: 'tidak boleh kosong' })
        }
    }

    login() {
        const { email, password } = this.state
        dbfirebase.auth().signInWithEmailAndPassword(email,password)
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
                <h3>Login</h3>
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
                
                <button className="btn btn-primary" onClick={this.handleSubmit}>Login</button>
                <br/>
                Belum punya akun ? 
                <Link to={'signup'} >Daftar</Link>
            </div>
        );
    }
}

export default LoginContainer;