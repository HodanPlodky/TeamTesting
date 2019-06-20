import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as auth from '../authPages/auth';

class NavBar extends Component {
    state = {  }
    render() { 
        return ( 
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link active" to="/">Home <span className="sr-only">(current)</span></Link>
                    <Link className="nav-item nav-link" to="/notes">About</Link>
                    {this.handleAuthLinks()}
                </div>
                </div>
            </nav> 
        );
    }

    handleAuthLinks = () => {
        if (auth.isAuthenticated()){
            return (
                <Link className="nav-item nav-link" onClick={this.handleLogOut} to="/">LogOut</Link>
            );
        }
        else {
            return (
                <React.Fragment>
                    <Link className="nav-item nav-link" to="/login">LogIn</Link>
                    <Link className="nav-item nav-link" to="/register">Register</Link>
                </React.Fragment>
            );
        }
    }

    handleLogOut = (e) => {
        e.preventDefault();
        const settings = require('../../settings.json');
        auth.loggedOut(()=>window.location.reload(true));
        auth.logOut(settings.server_address);
    }
}
 
export default NavBar;