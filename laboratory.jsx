import React, { Component } from 'react';

class Laboratory extends Component {
    render() { 
        return ( 
            <div className="container">
                <h1 className="mx-auto"> Laboratoře </h1>
                <img src={this.props.data.img} alt="Obrázek laboratoří"/>
                <div>
                    <button type="button" className="btn btn-secondary" href="#"> {this.props.data[0].text} </button>
                </div>
            </div>
         );
    }
}
 
export default Laboratory;