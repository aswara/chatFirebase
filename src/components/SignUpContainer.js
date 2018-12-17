import React, { Component } from 'react';
import { dbfirebase } from '../firebase';
import { Link } from 'react-router-dom'

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
            <div className="login">
                <div className="shadow bg-light login-form mt-5">

                    <h1>Buat Akun</h1>
                    <span>{this.state.error}</span>
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
                    
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Daftar</button>
                    <br/>
                    <p>Sudah punya akun ? <Link style={{ textDecoration: 'none', color: '#453a9', fontWeight: '500'  }} to={'login'} >Masuk</Link> </p>

                </div>
            </div>
        );
    }
}

export default SignUpContainer;