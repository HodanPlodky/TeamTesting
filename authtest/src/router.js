import React from 'react';
import {Route} from 'react-router-dom';
import LogIn from './components/authPages/LogIn';
import Home from './components/home/Home';
import Register from './components/authPages/Register';


const BaseRouter = () => (
    <div>
            <Route exact path='/' component={Home}/>
            <Route exact path='/login/' component={LogIn}/>
            <Route exact path='/register/' component={Register}/>
    </div>
)

export default BaseRouter;