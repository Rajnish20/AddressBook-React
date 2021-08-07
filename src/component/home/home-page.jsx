import React from 'react';
import './home-page.scss';
import logo from '../../assets/book.png';
import addIcon from '../../assets/add-24px.svg';

import {Link, withRouter} from 'react-router-dom';



function HomePage(){
    return(
        <div className="body">
        <header className="header-content">
            <div className="logo-content">
                <img src={logo} alt="Logo" width="60" height="55" />
                <div>
                    <span className="address-text">ADDRESS</span><br />
                    <span className="address-text book">BOOK</span>
                </div>
            </div>
        </header>
        <div className="main-content">
            <div className="main-header">
                <div className="person-detail-text">
                    Person Details
                </div>
                <Link to="addressBook-form" className="add-button">
                  <img src={addIcon} alt="Add Button" />Add User
                </Link>
            </div>
            <div className="table-main">
                
            </div>
        </div>
      </div>
    );
}

export default HomePage;