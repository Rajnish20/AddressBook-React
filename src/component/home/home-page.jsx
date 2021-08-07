import React from 'react';
import './home-page.scss';
import logo from '../../assets/book.png';
import addIcon from '../../assets/add-24px.svg';

import {Link, withRouter} from 'react-router-dom';
import AddressBookService from '../../service/addressbook-service';
import Display from '../table/table';



class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allPersonArray: [],
            personArray: [],
          };
        this.addressBookService = new AddressBookService();
    }

componentDidMount(){
    this.getPersonList();
}

getPersonList = () => {
    this.addressBookService.getAllPerson()
    .then(responseDTO => {
        let responseData = responseDTO.data;
      console.log("Data received after GET Call :\n" + responseData.data);
      this.setState({allPersonArray: responseData.data});
      this.setState({personArray: responseData.data});
    }).catch(errror => {
      console.log("Error while fetching Employee List\nError : " + JSON.stringify(errror));
    })
  }

   render(){
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
                <Display personArray = {this.state.personArray} />
            </div>
        </div>
      </div>
    );
 }
}

export default withRouter(HomePage);