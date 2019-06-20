import React, { Component } from 'react';
import './auth';
import * as auth from './auth';

class LogIn extends Component {
    state = {  }
    render() { 
        return ( 
        <form onSubmit={this.handleSubmit}>
            {auth.isAuthenticated() ? <p>You are logged</p> : <p>nope</p>}
            <div className="form-group">
              <label>User name</label>
              <input type="username" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter username"/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form> );
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        //auth.logged = () => console.log('maybe');
        auth.logged(()=>window.location.reload(true));
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;
        const settings = require('../../settings.json');
        auth.logIn(username, password, settings.server_address);
    }
}
 
export default LogIn;