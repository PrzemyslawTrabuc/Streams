import React from 'react'
import {Link} from 'react-router-dom';
import GoogleAuth2 from "./GoogleAuth2";

const Header = () =>{
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">
                Streamer
            </Link>
                <div className="right menu">
                    <Link to="/" className="item">
                        All Streams
                    </Link>
                    <GoogleAuth2 />
                </div>

        </div>
    )
}
export default Header;