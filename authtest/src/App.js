import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './components/layout/navbar';
import {BrowserRouter as Router} from 'react-router-dom';
import BaseRouter from './router';
import * as auth from './components/authPages/auth';

class App extends Component {
  state = {  }

  componentWillMount(){
    const settings = require('./settings.json');
    auth.start(settings.server_address);
  }
  componentDidMount(){
  }

  render() {  
    //const settings = require('./settings.json');
    //console.log(settings.server_address);
    return (
      <Router>
      <div className="App">
        <NavBar/>
        <BaseRouter/>
      </div>
      </Router>
    );
  }
}
 
export default App;
