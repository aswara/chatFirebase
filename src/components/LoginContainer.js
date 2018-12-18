import React, { Component } from 'react';
import { dbfirebase } from '../firebase';
import { Link } from 'react-router-dom';
import Loading from './loading'

class LoginContainer extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        loading : false
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
        this.setState({ loading: true })
        const { email, password } = this.state
        dbfirebase.auth().signInWithEmailAndPassword(email,password)
        .then(res => {
            this.onLogin()
        })
        .catch(err => {
            this.setState({ error : 'gagal masuk', loading: false })
        })
    }

    onLogin() {
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="login">
            { this.state.loading ? <Loading /> : '' }
                <div>
                    <div className="login-form">
                    <h1>Masuk Akun</h1>
                    <span style={{ color: 'red' }}>{this.state.error}</span>
                    <label>Email</label>
                    <input
                    type="text"
                    name="email"
                    className="email"
                    onChange={this.handleChange}
                    value={this.state.email}
                    />
                    <label>Password</label>
                    <input
                    type="password"
                    name="password"
                    className="password"
                    onChange={this.handleChange}
                    value={this.state.pasword}
                    />
                    
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Masuk</button>
                    <br/>
                    <p>Belum punya akun ? <Link style={{ textDecoration: 'none', color: '#453a9', fontWeight: '500'  }} to={'signup'} >Daftar</Link> </p>
                    
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginContainer;