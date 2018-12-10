import './Header.css'
import React from 'react'
import { userService } from '../../services';

export default props =>
    <header className="header d-none d-sm-flex flex-column">
        <div className="info">
            <h1>
                <i className={`fa fa-${props.icon}`}></i> {props.title}
            </h1>
            <p className="lead text-muted">{props.subtitle}</p>
        </div>
        <div className="logout">
            <button className="header btn btn-secondary"
                onClick={e => userService.logoff()}>
                Logout
            </button>
        </div>
    </header>