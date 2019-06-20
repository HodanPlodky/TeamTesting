import React, { Component } from 'react';
import * as auth from '../authPages/auth';
import Note from './Note';
import axios from 'axios';

class Notes extends Component {
    state = { notes:[{id:1, text:"aaaa", title:"bbbb"}] }

    componentDidMount(){
        const settings = require('../../settings.json');
        if (auth.isAuthenticated()){
            axios.get(`${settings.server_address}/api/notes/`, {headers:{"Authorization":auth.getToken()}})
                .then(res => {
                    this.setState({notes : res.data})
                });
        }
    }

    render() { 
        return ( 
        <div>
            <h1>Notes</h1>
            {
                auth.isAuthenticated()?
                this.state.notes.map(note => <Note key={note.id} data={note}/>)
                :
                <h2>Get the fuck out</h2>
            }
        </div> );
    }
}
 
export default Notes;