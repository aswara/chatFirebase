import React from 'react';

const Header = (props) => {
    return (
        <div>
            <h1>Selamat Datang {props.children}</h1> 
        </div>
    );
};
export default Header;