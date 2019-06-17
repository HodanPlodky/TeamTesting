import React, { Component } from 'react';
import Laboratory from './laboratory';
import Interestings from './interestings';

class Lab_Interest_parrent extends Component {
    state = { 
        interestings_data:[{id: 1, img: "img", text: "Some thing or another, fill be filled by backend"},
                            {id: 2, img: "img", text: "Some thing or another, fill be filled by backend"}],
        physics_data: [{id: 1, img: "img",text: "A bude se bušit!"}, {id: 2, img: "img", text: "A bude se bušit!"}],
        chemistry_data: [{id: 1, img: "img", text: "Boom-clap-booom!"}, {id: 2, img: "img", text: "Boom-clap-booom!"}]
     }
    render() { 
        return ( <div> {this.choose_window()} </div> );
    }

    choose_window = () =>{
        let subject = this.props.subject;

        //if math return math data
        if (subject == 1){
            return <Interestings data={this.state.interestings_data} />;
        }
        //if physics return physics data
        else if (subject == 2){
            return <Laboratory data={this.state.physics_data}/>;
        }
        else {
            return <Laboratory data={this.state.chemistry_data}/>;
        }
    }


}


export default Lab_Interest_parrent;