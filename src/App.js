import './App.css';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';
import FormPage from './component/addressBook-form/form-page';
import HomePage from './component/home/home-page'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Switch>
         <Route exact path = "/home"><HomePage /></Route>
           <Route exact path="/addressBook-form">
             <FormPage/>
           </Route>
           <Route exact path="/addressbook-form/:id"><FormPage /></Route>
           <Route exact path=""><Redirect exact from="/" to="/home" /></Route>
         </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
