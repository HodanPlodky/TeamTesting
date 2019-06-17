import React, { Component } from 'react';

class Interestings extends Component {
    render() { 
        return ( 
            <div className="container">
                <h1 className="mx-auto"> Zajímavosti </h1>
                <img src={this.props.data.img} alt="Obrázek zajímavostí/pozadí"/>
                <div> 
                    <button type="button" className="btn btn-secondary"  href="#"> Více zajímavostí </button>
                </div>
            </div>
         );
    }
}
 
export default Interestings;