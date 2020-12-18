import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="#">
                    <h4 className="nav_nam text-white">Pioneer alph@ </h4>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="navbar-brand" href="#">
                                <h4 className="nav_nam text-white mr-3">Add A Blog</h4>
                            </a>                               
                        </li>                        
                    </ul>                    
                </div>
            </nav>
        </div>
    );
};

export default Navbar;