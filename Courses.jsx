import React, { Component } from 'react';
import Course from './Course';
import axios from 'axios';

class Courses extends Component {
    state = { 
        courses:[
            {id:1, title:'Algebra', about:'About algebra', subject:1},
            {id:2, title:'Geometrie', about:'About geometry', subject:1},
            {id:3, title:'Calculus', about:'About calculus', subject:1},
            {id:2, title:'Mechanika', about:'About geometry', subject:2},
            {id:3, title:'Gravitace', about:'About calculus', subject:2},
            {id:3, title:'Radoxní reakce', about:'About calculus', subject:3}
        ]
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/courses/')
            .then(res=>{
                    //console.log(res.data);
                    const courses = [...res.data];
                    //console.log(courses);
                    this.setState({courses:courses});
            });
    }

    render() { 
        //console.log(this.state.courses);
        return ( 
            
            <div className="row">
                {this.state.courses.map(course=>{
                    if (this.props.categoryId == course.subject){
                        return <Course key={course.id} data={course}/>
                    }
                })}
            </div>
         );
    }
}
 
export default Courses;