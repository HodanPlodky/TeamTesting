import React, { Component } from 'react';
import * as auth from './auth';

class Register extends Component {
    state = {  }
    render() { 
        return ( 
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>User name</label>
                  <input type="username" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter username"/>
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" id="password1" placeholder="Password"/>
                </div>
                <div className="form-group">
                  <label>Repeat password</label>
                  <input type="password" className="form-control" id="password2" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form> );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        auth.logged(()=>window.location.reload(true));
        const username = e.target.elements.username.value;
        const email = e.target.elements.email.value;
        const password1 = e.target.elements.password1.value;
        const password2 = e.target.elements.password2.value;
        const settings = require('../../settings.json');
        auth.register(username,email, password1, password2, settings.server_address);
    }
}
 
export default Register;