import React, { Component } from 'react';

class Note extends Component {
    render() { 
        return ( 
            <div>
                <h2>{this.props.data.title}</h2>
                <p>{this.props.data.text}</p>
            </div>
        );
    }
}
 
export default Note;