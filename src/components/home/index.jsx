import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './home.css'
import { dbfirebase } from '../../firebase'

class index extends Component {
    state ={
        user: ''
    }

    componentDidMount() {
        dbfirebase.auth().onAuthStateChanged((user) => {
            if (user) {
            this.setState({ user });
            } else {
            this.props.history.push('/login')
            }
        });
    }

    render() {
        return (
            <div className="home">
                <div className="a"><span>. . . . . . . . . .</span></div>
                <div className="b"><span>. . . . . . . . . .</span></div>
                <div className="wrapper">
                    <Link style={{ textDecoration: 'none' }} to="/public"><div className="public">Publik</div></Link>
                    <Link style={{ textDecoration: 'none' }} to="/private"><div className="private">Pribadi</div></Link>
                    <Link style={{ textDecoration: 'none' }} to="/login"><div className="public">Masuk</div></Link>
                    <Link style={{ textDecoration: 'none' }} to="/signup"><div className="private">Daftar</div></Link>
                </div>
            </div>
        );
    }
}

export default index;