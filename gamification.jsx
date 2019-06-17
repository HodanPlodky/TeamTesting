import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Chart1 from './linechart';
import Chart2 from './linechart2';
import Chart3 from './linechart3';

class Gamification extends Component {
    state = { 
        current_card_id : 1,
        card_content :[
            {
                id:1,
                title: 'Matematika',
                content: 'Toto je lorem ipsum karty matematika.'
            },
            {
                id:2,
                title: 'Fyzika',
                content: 'Toto je lorem ipsum karty matematika.'
            },
            {
                id:3,
                title: 'Chemie',
                content: 'Toto je lorem ipsum karty matematika.'
            }
        ],
        showed_name : ''
     }
    render() { 
        return ( 
            <div className='gamification_div'>
                <div className='card card_stats'>
                    <div className='card-header'>
                        <h3>Statistiky</h3>
                    </div>
                        <h3 className='card-title' id='card_title'>{this.state.showed_name}</h3>
                        {this.select_diagram(this.state.current_card_id)}
                        <button onClick={()=>{this.change_current_up(this.state.current_card_id); this.selected_title(this.state.current_card_id)}}> -> </button>
                    </div>
                    <div className='card card_challenge'>
                    <div className='card-header'>
                        <h3>Výzva</h3>
                    </div>
                        <p>Výzva lorem ipsum hahaha xdxdxd </p>
                        <Link to='/challenge' className='mx-auto btn btn_challenge btn-light'> K výzvě</Link>
                    </div>
            </div>
         );
    }

    change_current_up = (id) =>{
        if(id === 1){
            this.setState({current_card_id: 2})
            console.log('number 1')
        }
        else{
            if(id === 2){
                this.setState({current_card_id: 3})
                console.log('number 2')
            }
            else{
                if(id === 3){
                    this.setState({current_card_id: 1})
                    console.log('number 3')
                }
            }
        }
    }

    selected_title = (id) => {
        this.state.card_content.map(card => {
            if(card.id === id){
                console.log(card.title)
                console.log('done')
                console.log(this.state.showed_name)
                this.setState({showed_name : card.title})
                return (card.title)
            }
        })
    }
    select_diagram = (id) => {
        if(id === 1){
   
            return <Chart1 />
        }
        if(id === 2){
          return <Chart2 />
       }
       if(id === 3){
          return <Chart3 />
       }
    }
}
 
 

export default Gamification;