import React, { Component } from 'react';
import '../css/site.css';
import  {Link} from 'react-router-dom';

class Course extends Component {
    state = {  }
    render() { 
        const data = this.props.data;
        return (
        <div className="col-sm-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                    <p className="card-text">{data.about}</p>
                    <Link href="#" className="btn btn-primary">Start</Link>
                </div>
            </div>
        </div>);
    }
}
 
export default Course;