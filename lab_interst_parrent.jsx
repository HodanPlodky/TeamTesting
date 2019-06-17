import React, { Component } from 'react';
import Laboratory from './laboratory';
import Interestings from './interestings';
import axios from 'axios';

class LabInterestParrent extends Component {
    state = { 
        interesting_data: [{id:1, text: 'Matika',img: 'https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image', subject: 1}, 
                {id:2, img: 'https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image', subject: 2},
                {id:3, img: 'https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image', subject: 2}, 
                {id:4, img: 'https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image', subject: 3}]
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/intrestings')
            .then(res=>{
                console.log(res.data);
                const interesting_data = [...res.data];
                interesting_data.forEach(i => i.img='https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image');
                this.setState({interesting_data});
            });
    }

    render() { 
        return ( <div> {this.choose_window()} </div> );
    }

    choose_window = () =>{
        let subject = this.props.subject;

        const tmp = this.state.interesting_data.find((e)=>e.subject === subject);
        //if math return math data
        if (subject == 1){
            return <Interestings data={tmp} />;
        }
        else {
            return <Laboratory data={tmp}/>;
        }
    }


}


export default LabInterestParrent;