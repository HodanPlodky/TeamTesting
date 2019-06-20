import React from 'react';
import {Route} from 'react-router-dom';
import LogIn from './components/authPages/LogIn';
import Home from './components/home/Home';
import Register from './components/authPages/Register';
import Notes from './components/notes/Notes';


const BaseRouter = () => (
    <div>
            <Route exact path='/' component={Home}/>
            <Route exact path='/login/' component={LogIn}/>
            <Route exact path='/register/' component={Register}/>
            <Route exact path='/notes/' component={Notes}/>
    </div>
)

export default BaseRouter;