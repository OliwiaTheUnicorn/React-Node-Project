import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const Menu = ({history}) => (
    <div className="">
        <ul className="nav nav-tabs">
            <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signin">Sign In</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
            </li>
            {JSON.stringify(props.history)}
        </ul>
    </div>
);

export default withRouter(Menu);
