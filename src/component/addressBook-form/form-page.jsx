import './form-page.scss';
import Logo from '../../assets/book.png';
import Cross from '../../assets/cross+delete+icon-1320196185584855591.png';
import React,{useEffect, useState} from 'react';
import AddressBookService from '../../service/addressbook-service';
import { withRouter, Link, useParams} from 'react-router-dom';


function Form(props){
    
    const[form,setForm] = useState({
      id:'',
      name:'',
      address:'',
      number:'',
      city:'',
      state:'',
      pinCode:'',
    })

    const[nameError,setNameError] =useState("");
    const[numberError,setNumberError] = useState("");
    const[isErrorForName,setErrorStatus]=useState("");
    const[isErrorForNumber,setErrorStatusForNumber] = useState("");
    const[isUpdate,setUpdateStatus]=useState("");

    useEffect(() => {
      let id = props.match.params.id;
      if(id !== undefined && id !==''){
          new AddressBookService().getPersonById(id)
          .then(responseDTO => {
              let responseData = responseDTO.data;
              setPersonForm(responseData.data);
              setUpdateStatus(true);
          }).catch(error => {
              console.log("Error while Fetching Data");
          })
      }
      
  },[])

  const setPersonForm = (personData) => {
     form.id = personData.personId;
     form.name = personData.name;
     form.number = personData.phoneNumber;
     form.address = personData.address;
     form.city = personData.city;
     form.state = personData.state;
     form.pinCode = personData.pinCode;
  }


    const handleChange = (event) => {
      setForm({...form,
        [event.target.name]: event.target.value});

      const nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');  
      if(nameRegex.test(form.name) || form.name.length === 0 ){
        setNameError('');
        setErrorStatus(false);
      }  
      else{
        setNameError("Invalid Name");
        setErrorStatus(true);
      }
      const numberRegex = RegExp('\\d{2}\\d{10}$');
        if(numberRegex.test(form.number) || form.number.length === 0){
            setNumberError('');
            setErrorStatusForNumber(false);
        }else{
            setNumberError("Invalid Phone Number");
            setErrorStatusForNumber(true);
        }
    }

   
    const save = (event) => {
      event.preventDefault();
        if(isErrorForNumber || isErrorForName){
            window.alert("Please Fill correct values")
        }else{
          let personObject = {
            personId:form.id,
            name: form.name,
            phoneNumber:form.number,
            address:form.address,
            city:form.city,
            state:form.state,
            pinCode:form.pinCode,
          }
            if(isUpdate){
                new AddressBookService().updatePerson(personObject).then(responseText => {
                    console.log("Person Data Updated Successfully" + JSON.stringify(responseText.data));
                    props.history.push('/home');
                }).catch(error => {
                    console.log("Error while Updating" +JSON.stringify(error.data));
                    
                })
            }else{
                new AddressBookService().addPerson(personObject).then(responseText =>{
                    console.log("data added successfully" +JSON.stringify(responseText.data));
                    props.history.push('/home');
                })
                .catch(error => {
                    console.log("Error While Adding Data to Database");
                })
            }
        }
    }

    const reset = (event) => {
      window.location.reload();
    }
    
    return (
      <div className="body">
        <header className="header-content">
          <div className="logo-content">
            <img src={Logo} className="logo-image" width="60" height="55" alt="Address Book Logo"/>
            <div>
              <span className="address-text">ADDRESS</span> <br />
              <span className="address-text book">BOOK</span>
            </div>
          </div>
        </header>
        <div className="form-content">
          <div className="form-head">
            <div className="form-header">PERSON ADDRESS FORM</div>
            <Link to="/home">
              <img className="cancel-image" src={Cross} width="28" height="28" alt="AddressBook-Logo"/>
            </Link>
          </div>
          <form className="form" action="#" onReset={(event) => reset(event)} onSubmit={(event) => save(event)}>
            <div className="row-content">
              <label className="label text" for="name">Full Name</label>
              <input className="input" value={form.name} type="text" id="name" name="name" placeholder=""required
                onChange={(event) => handleChange(event)} />
              <error-output className="text-error" name="nameError" for="text">{nameError}</error-output>
            </div>
            <div className="row-content">
              <label className="label text" for="number">Phone Number</label>
              <input className="input" value={form.number} type="text" id="number" name="number" placeholder=""required
                onChange={(event) => handleChange(event)} />
              <error-output className="number-error" name="numberError" for="number">{numberError}</error-output>
            </div>
            <div className="row-content">
              <label className="label text" for="address">Address</label>
              <textarea id="address"value={form.address}className="input" name="address"placeholder=""
                onChange={(event) => handleChange(event)} ></textarea>
            </div>
            <div className="row-content-address">
              <div className="city">
                <label className="label text" for="City">City</label>
                <select id="city" value={form.city} name="city" onChange={(event) => handleChange(event)}  >
                  <option value="" disabled selected>Select City</option>
                  <option value="New Delhi">New Delhi</option>
                  <option value="Srinagar"> Srinagar</option>
                  <option value="Leh">Leh</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Amritsar">Amritsar</option>
                  <option value="Ludhiana">Ludhiana</option>
                  <option value="Jalandhar">Jalandhar</option>
                  <option value="Pathankot">Pathankot</option>
                  <option value="Shimla">Shimla</option>
                  <option value="Manali">Manali</option>
                  <option value="Dharamshala">Dharamshala</option>
                  <option value="Haridwar">Haridwar</option>
                  <option value="Rishikesh">Rishikesh</option>
                  <option value="Rudraprayag">Rudraprayag</option>
                  <option value="Chamoli">Chamoli</option>
                  <option value="Dehradun">Dehradun</option>
                  <option value="Almora">Almora</option>
                  <option value="Ranikhet">Ranikhet</option>
                  <option value="Rohtak">Rohtak</option>
                  <option value="Sonipat">Sonipat</option>
                  <option value="Gurgaon">Gurgaon</option>
                  <option value="Faridabad">Faridabad</option>
                  <option value="Ambala">Ambala</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Karnal">Karnal</option>
                  <option value="Aligarh">Aligarh</option>
                  <option value="Noida">Noida</option>
                  <option value="Ghaziabad">Ghaziabad</option>
                  <option value="Agra">Agra</option>
                  <option value="Kotdwar">Kotdwar</option>
                  <option value="Lucknow">Lucknow</option>
                  <option value="Allahabad">Allahabad</option>
                  <option value="Kanpur">Kanpur</option>
                  <option value="Merrut">Merrut</option>
                  <option value="Patna">Patna</option>
                  <option value="Vaishali">Vaishali</option>
                  <option value="Darbhanga">Darbhanga</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Alwar">Alwar</option>
                  <option value="Kota">Kota</option>
                  <option value="Jodhpur">Jodhpur</option>
                  <option value="Jaisalmer">Jaisalmer</option>
                  <option value="Bikaner">Bikaner</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Gandhinagar">Gandhinagar</option>
                  <option value="Vadodra">Vadodra</option>
                  <option value="Bhopal">Bhopal</option>
                  <option value="Indore">Indore</option>
                  <option value="Raipur">Raipur</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Murshidabad">Murshidabad</option>
                  <option value="Hooghly">Hooghly</option>
                  <option value="Asansol">Asansol</option>
                  <option value="Durgapur">Durgapur</option>
                  <option value="Bardhman">Bardhman</option>
                  <option value="Dhanbad">Dhanbad</option>
                  <option value="Ranchi">Ranchi</option>
                  <option value="Jamshedpur">Jamshedpur</option>
                  <option value="Puri">Puri</option>
                  <option value="Paradip">Paradip</option>
                  <option value="Bhubhneshwar">Bhubhneshwar</option>
                  <option value="Gangtok">Gangtok</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Amravati">Amravati</option>
                  <option value="Vishakapatnam">Vishakapatnam</option>
                  <option value="Itanagar">Itanagar</option>
                  <option value="Guwahati">Guwahati</option>
                  <option value="Dispur">Dispur</option>
                  <option value="Kazringa">Kazringa</option>
                  <option value="Panaji">Panaji</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Surathkal">Surathkal</option>
                  <option value="Mangalore">Mangalore</option>
                  <option value="Kochi">Kochi</option>
                  <option value="Thiruvanthapuram">Thiruvanthapuram</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Nagpur">Nagpur</option>
                  <option value="Pune">Pune</option>
                  <option value="Nasik">Nasik</option>
                  <option value="Thane">Thane</option>
                  <option value="Imphal">Imphal</option>
                  <option value="Shillong">Shillong</option>
                  <option value="Aizwal">Aizwal</option>
                  <option value="Kohima">Kohima</option>
                  <option value="Dimapur">Dimapur</option>
                  <option value="Agartala">Agartala</option>
                  <option value="Port Blair">Port Blair</option>
                  <option value="Kargil">Kargil</option>
                  <option value="Kavaratti">Kavaratti</option>
                  <option value="Pondicherry">Pondicherry</option>
                </select>
              </div>
              <div className="state">
                <label className="label text" for="State">State</label>
                <select id="state"value={form.state}name="state"onChange={(event) => handleChange(event)}  >
                  <option value="" disabled selected>Select State</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Daman and Diu">Daman and Diu</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Puducherry">Puducherry</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                </select>
              </div>
              <div className="pinCode">
                <label className="label text pinCode-text" for="pinCode">PinCode</label>
                <input className="input-pinCode"value={form.pinCode}type="number"id="pinCode"name="pinCode"placeholder="Enter PinCode"required
                  onChange={(event) => handleChange(event)}  />
              </div>
            </div>
            <div className="button-content">
              <button type="submit"className="button submitButton"id="submitButton">Add</button>
              <button type="reset" className="resetButton button" id="resetBtn">Reset</button>
            </div>
          </form>
        </div>
      </div>
    );
}
export default withRouter(Form);