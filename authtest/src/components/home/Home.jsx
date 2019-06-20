import React, { Component } from 'react';
import * as auth from '../authPages/auth';

class Home extends Component {
    state = {  }
    render() { 
        return ( <h1 onClick={this.handleTest}>HIIIII</h1> );
    }

    handleTest = () => {
        const settings = require('../../settings.json');
        auth.isAuthenticatedRefresh(settings.server_address);
    }
}
 
export default Home;