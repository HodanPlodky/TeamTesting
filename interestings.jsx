import React, { Component } from 'react';

class Interestings extends Component {
    render() { 
        return ( 
            <div className="card border">
                <h1 className="mx-auto"> Zajímavosti </h1>
                <img className="mx-auto" src={this.props.data.img} alt="Obrázek zajímavostí/pozadí"/>
                <div className="mx-auto">
                    <p> {this.props.data.text} </p>
                </div>
                <div className="mx-auto"> 
                    <button type="button" className="btn btn-secondary"  href="#"> Více zajímavostí </button>
                </div>
            </div>
         );
    }
}
 
export default Interestings;