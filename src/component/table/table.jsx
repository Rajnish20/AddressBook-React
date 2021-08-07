import React from 'react';
import './table.scss';
import deleteIcon from '../../assets/delete-black-18dp.svg';
import updateIcon from '../../assets/create-black-18dp.svg';
import {withRouter} from 'react-router-dom';
import AddressBookService from '../../service/addressbook-service';

const Display = (props) => {
    
    return(
        <table id ="display" className="table">
            <tbody>
                <tr>
                    <th className="name-header">Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>PinCode</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                </tr>
                    {
                    props.personArray.map((person) => (
                    <tr key = {person.personId}>
                        <td className="name-data">{person.name}</td>
                        <td>{person.address}</td>
                        <td>{person.city}</td>
                        <td>{person.state}</td>
                        <td>{person.pinCode}</td>
                        <td>{person.phoneNumber}</td>
                        <td><img src={deleteIcon} className="icon" onClick={() => deletePerson(person.personId)} alt="delete" />
                        <img src={updateIcon} className="icon" onClick={() => updatePerson(person.personId)} alt="edit" /></td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}

const deletePerson = (personId) => {
    new AddressBookService().removePerson(personId)
    .then(responseText => {
        window.location.reload();
        window.alert("Person Removed Successfully");
    }).catch(error => {
        console.log("Error while Removing" +JSON.stringify(error));
    })
}

const updatePerson =(personId) => {

}

export default withRouter(Display);