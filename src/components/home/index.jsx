import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './home.css'
import { dbfirebase } from '../../firebase'
import image from '../../g870.png'
import Loading from '../loading'

class index extends Component {
    state ={
        user: {
            email: null
        },
        loading: true
    }

    componentDidMount() {
        dbfirebase.auth().onAuthStateChanged((user) => {
            if (user) {
            this.setState({ user, loading: false });
            } else {
                this.setState({ loading: false })
            }
        });
    }

    logout = () => {
        this.setState({ user: null })
        dbfirebase.auth().signOut().then(function() {
           
          }).catch(function(error) {
           
          });
    }

    render() {
        console.log(this.state)
        return (
            <div className="home">
                { this.state.loading ? <Loading /> : '' }
                 <img src={image}/>
                 <h1>Chat</h1>
                <div className="wrapper">
                {
                    this.state.user && this.state.user.email ? 
                    <div>
                        <div style={{ color: '#4C9DFA', marginBottom: '10px', textAlign: 'center' }}>Selamat Datang</div>
                        <div className="public">{this.state.user.email}</div>
                        <div onClick={this.logout} className="private">Keluar</div>
                    </div>
                    :
                    <div>
                        <div  style={{ color: '#4C9DFA', marginBottom: '10px', textAlign: 'center' }}>Anda Belum Masuk</div>
                        <Link style={{ textDecoration: 'none' }} to="/login"><div className="public">Masuk</div></Link>
                        <Link style={{ textDecoration: 'none' }} to="/signup"><div className="private">Daftar</div></Link>
                    </div>
                }


                    <Link style={{ textDecoration: 'none' }} to="/public"><div className="public">Publik</div></Link>
                    <Link style={{ textDecoration: 'none' }} to="/private"><div className="private">Pribadi</div></Link>
                </div>
            </div>
        );
    }
}

export default index;