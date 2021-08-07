import config from '../config/config';
import AxiosService from './axios-service';
export default class AddressBookService{
    baseUrl = config.baseUrl;
    addPerson(personData){
        return AxiosService.postService(`${this.baseUrl}addressbook/create`, personData);
    }
}