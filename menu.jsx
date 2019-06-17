import React from 'react';
import {Link} from 'react-router-dom';

function Menu(){
    return (
        <div className='side_nav'>
            <h1 className='side_nav'>menu</h1>
            <ul className='nav_ul' type='none'>
            <li className='nav_li'><Link className='btn btn-light btn_nav' to="/">Domů</Link></li><br></br>
            <li className='nav_li'><Link className='btn btn-light btn_nav' to="/edu">Výuka</Link></li><br></br>
            <li className='nav_li'><Link className='btn btn-light btn_nav' to="/stats">Statistiky</Link></li><br></br>
            <li className='nav_li'><Link className='btn btn-light btn_nav' to="/school">Škola</Link></li><br></br>
            <li className='nav_li'><Link className='btn btn-light btn_nav' to="/tests">Testy</Link></li><br></br>
            <li className='nav_li'><Link className='btn btn-light btn_nav' to="/communicaton">Komunikace</Link></li><br></br>
            </ul>
        </div>
    )
}

export default Menu