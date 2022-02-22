import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HomeContainer from './container/HomeContainer';
import CustomersContainer from './container/CustomersContainer';
import CustomerContainer from './container/CustomerContainer';
import NewCustomerContainer from './container/NewCustomerContainer';

class App extends Component {
    render(){
        return (
            <Router>
                <div className="App">
                    <Route exact path="/" render={HomeContainer}/>
                    <Route exact path="/customers" render={CustomersContainer}/> 
                    <Switch>
                        <Route path="/customers/new" component={NewCustomerContainer}/>
                        <Route path="/customers/:dni" render={props => <CustomerContainer dni={props.match.params.dni}/>}/>
                    </Switch>
                </div>
            </Router>   
        );
    }
}

export default App;
