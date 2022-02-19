import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HomeContainer from './container/HomeContainer';
import CustomersContainer from './container/CustomersContainer';

class App extends Component {

    renderHome = () => <HomeContainer/>

    renderCustomerContainer = () => <CustomersContainer/>

    renderCustomerListContainer = () => <h1>Customers List Container</h1>

    renderCustomerNewContainer = () => <h1>Customers New Container</h1>

    render(){
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/customers/new" component={this.renderCustomerNewContainer}/>
                        <Route path="/customers/:dni" component={this.renderCustomerContainer}/>
                        <Route path="/customers" render={this.renderCustomerContainer}/> 
                        <Route path="/" render={this.renderHome}/>
                    </Switch>
                </div>
            </Router>   
        );
    }
}

export default App;
