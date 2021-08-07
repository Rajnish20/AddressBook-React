import './form-page.scss';
import Logo from '../../assets/book.png';
import Cross from '../../assets/cross+delete+icon-1320196185584855591.png';
import React,{useState} from 'react';
import AddressBookService from '../../service/addressbook-service';
import { withRouter} from 'react-router';


function Form(props){
    const[name,setName] = useState("");
    const[number,setNumber] = useState("");
    const[address,setAddress] = useState("");
    const[city,setCity] = useState("");
    const[state,setState] = useState("");
    const[pinCode,setPinCode] = useState("");
    const[nameError,setNameError] =useState("");
    const[numberError,setNumberError] = useState("");
    const[isError,setErrorStatus]=useState("");

    
    const handleNameChange = (event) => {
        setName(event.target.value);
        const nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if(nameRegex.test(event.target.value)){
            setNameError('');
            setErrorStatus(false);
        }else{
            setNameError("Invalid Name");
            setErrorStatus(true);
        }
    }

    const handleNumberChange = (event) => {
        setNumber(event.target.value);
        const numberRegex = RegExp('\\d{2}\\d{10}');
        if(numberRegex.test(event.target.value)){
            setNumberError('');
            setErrorStatus(false);
        }else{
            setNumberError("Invalid Phone Number");
            setErrorStatus(true);
        }
    }

    const handleAdddressChange = (event) => {
        setAddress(event.target.value);
    }

    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    const handleStateChange = (event) => {
        setState(event.target.value);
    }

    const handlePinCodeChange = (event) => {
        setPinCode(event.target.value);
    }

    const save = (event) => {
        event.preventDefault();
        if(isError){
            window.alert("Please Fill correct values")
        }else{
            let personObject = {
                name: name,
                phoneNumber:number,
                address:address,
                city:city,
                state:state,
                pinCode:pinCode,
            }
            new AddressBookService().addPerson(personObject).then(responseText =>{
                console.log("data added successfully" +JSON.stringify(responseText.data));
                props.history.push('/home');
            })
            .catch(error => {
                console.log("Error While Adding Data to Database");
            })
        }

    }
    return(
        <div className="body">
            <header className="header-content">
                <div className="logo-content">
                    <img src={Logo} className="logo-image" width="60" height="55" alt="Address Book Logo"/>
                    <div>
                        <span className="address-text">ADDRESS</span> <br/>
                        <span className="address-text book">BOOK</span>
                    </div>
                </div>
            </header>
            <div className="form-content">
                <div className="form-head">
                    <div className="form-header">PERSON ADDRESS FORM</div>
                    <img className="cancel-image" src={Cross} width="28" height="28" onclick="cancel()" alt="AddressBook-Logo"/>
                </div>
                <form className="form" action="#" onReset="resetForm()" onSubmit={(event) => save(event)}>
                    <div className="row-content">
                        <label className="label text" for="name">Full Name</label>
                        <input className="input" value={name} type="text" id="name" name="name" placeholder="" required onChange={(event) => handleNameChange(event)}/>
                        <error-output className="text-error" name="nameError" for="text">{nameError}</error-output>
                    </div>
                    <div className="row-content">
                        <label className="label text" for="number">Phone Number</label>
                        <input className="input" value={number} type="text" id="number" name="number" placeholder="" required onChange={(event) => handleNumberChange(event)}/>
                        <error-output className="number-error" name="numberError" for="number">{numberError}</error-output>
                    </div>
                    <div className="row-content">
                        <label className="label text" for="address">Address</label>
                        <textarea id="address" value={address} className="input" name="address" placeholder="" onChange={(event) => handleAdddressChange(event)} ></textarea>
                    </div>
                    <div className="row-content-address">
                        <div className="city">
                            <label className="label text" for="City">City</label>
                            <select id="city" value={city} name="city" onChange={event => handleCityChange(event)} >
                                <option value="" disabled selected>Select City</option>
                                <option value="New delhi">New Delhi</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Pune">Pune</option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="Jaipur">Jaipur</option>
                                <option value="Gurgaon">Gurgaon</option>
                                <option value="Noida">Noida</option>
                            </select>
                        </div>
                        <div className="state">
                            <label className="label text" for="State">State</label>
                            <select id="state" value={state} name="state" onChange={(event) => handleStateChange(event)} >
                                <option value="" disabled selected>Select State</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Bihar">Bihar</option>
                            </select>
                        </div>
                        <div className="pinCode">
                            <label className="label text pinCode-text" for="pinCode">PinCode</label>
                            <input className="input-pinCode" value={pinCode} type="number" id="pinCode" name="pinCode" placeholder="Enter PinCode" required onChange={(event) => {handlePinCodeChange(event)}} />
                        </div>
                    </div>
                    <div className="button-content">
                        <button type="submit" className="button submitButton" id="submitButton">Add</button>
                        <button type="reset" className="resetButton button" id="resetBtn">Reset</button>
                    </div>
                </form>
            </div>
        </div>
        
    )
}

export default withRouter(Form);