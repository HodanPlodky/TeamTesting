import React, { Component } from 'react';
import axios from 'axios';

class Choosing extends Component {
    state = 
    { 
        current: 1,
        courses : [
        ]
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/subjects/')
            .then(res=>{
                const courses = [];
                res.data.forEach(d => courses.push({id:d.id, name:d.subject_name, addClass:"secondary"}));
                courses[0].addClass="primary";
                this.setState({courses});
            })
            .catch(err => console.log(err));
    }

    render() { 
        return ( 
        <div className="btn-group" role="group" aria-label="Basic example">
            {this.state.courses.map(course => <button type="button" key={course.id} onClick={()=>this.handleChange(course.id)} className={"btn btn-" + course.addClass}>{course.name}</button>)}
        </div> );
    }

    handleChange = (courseId) => {
        if (this.state.current !== courseId)
        {
            this.setState({current:courseId});
            const courses = [...this.state.courses];
            courses.forEach(i => i.addClass="secondary");
            courses.find(i=>i.id === courseId).addClass = "primary";
            this.setState({courses});
            this.props.onChange(courseId);
        }
    }
}
 
export default Choosing;