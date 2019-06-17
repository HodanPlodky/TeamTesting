import React, { Component } from 'react';
import LineChart from 'react-linechart';
import '../../node_modules/react-linechart/dist/styles.css';
 
export default class Chart1 extends Component {
    render() {
        const data = [
            {			
                color: 'black',						
                points: [{x: 1, y: 2},{x: 2, y: 5}, {x: 3, y: 3}, {x: 4, y: 5},{x: 5, y: 4},{x: 6, y: 6},{x: 7, y: 5}] 
            }
        ];

        return (
            <div>
                <div className="Chart">
                    <LineChart 
                        width={400}
                        height={300}
                        data={data}
                    />
                </div>				
            </div>
        );
    }
}
