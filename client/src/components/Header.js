import React from 'react'
import {Link} from 'react-router-dom';
import GoogleAuth2 from "./GoogleAuth2";

const Header = () =>{
    return (
        <div className="ui secondary pointing menu">
            <h1 style={{fontWeight: 'bold', padding:'5px'}}>
            <Link to="/" className="item">
                Streamer
            </Link>
            </h1>
                <div className="right menu">
                    <GoogleAuth2 />
                </div>

        </div>
    )
}
export default Header;