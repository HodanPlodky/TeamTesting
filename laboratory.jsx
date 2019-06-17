import React, { Component } from 'react';

class Laboratory extends Component {
    render() { 
        return ( 
            <div className="card border">
                <h1 className="mx-auto"> Laboratoře </h1>
                <img className="mx-auto" src={this.props.data.img} alt="Obrázek laboratoří"/>
                <div className="mx-auto">
                    <button type="button" className="btn btn-secondary" href="#"> A bude se bušit! </button>
                </div>
            </div>
         );
    }
}
 
export default Laboratory;