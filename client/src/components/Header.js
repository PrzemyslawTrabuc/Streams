import React from 'react'
import {Link} from 'react-router-dom';
import GoogleAuth2 from "./GoogleAuth2";

const Header = () =>{
    return (
        <div className="ui secondary pointing menu">
            <h1 style={{padding:'5px'}}>
            <Link to="/" className="item" style={{border:'none', fontWeight: '900', fontSize:"2rem", padding:'10px 0px 10px 0px'}}>
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