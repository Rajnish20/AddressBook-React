import config from '../config/config';
import AxiosService from './axios-service';
export default class AddressBookService{
    baseUrl = config.baseUrl;
    addPerson(personData){
        return AxiosService.postService(`${this.baseUrl}addressbook/create`, personData);
    }

    getAllPerson() {
        return AxiosService.getService(`${this.baseUrl}addressbook`);
    }

    removePerson(personId){
        return AxiosService.deleteService(`${this.baseUrl}addressbook/delete/${personId}`)
    }

    getPersonById(personId){
        return AxiosService.getService(`${this.baseUrl}addressbook/get/${personId}`);
    }

    updatePerson(personData){
        return AxiosService.putService(`${this.baseUrl}addressbook/update/${personData.personId}`,personData)
    }
}