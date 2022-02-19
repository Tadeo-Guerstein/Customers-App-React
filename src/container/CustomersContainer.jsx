import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import AppFrame from '../components/AppFrame';
import CustomersActions from '../components/CustomersActions';
import CustomersList from '../components/CustomersList';
import { fetchCustomers } from '../action/fetchCustomers';

const customers = [
    {
        "dni": "27098734",
        "name": "Tadeo Guerstein",
        "age": 19
    },
    {
        "dni": "83048746",
        "name": "Ricky Martin",
        "age": 40
    },
    {
        "dni": "83927479",
        "name": "Luis Miguel",
        "age": 56
    }
];

class CustomersContainer extends Component {

    componentDidMount() { 
        this.props.fetchCustomers();
    }

    handleAddNew = () => {
        this.props.history.push('/customers/new')
    }

    renderBody = customers => {
        return (
            <div>
                <CustomersList 
                    customers={customers} 
                    urlPath={'customers/'}>
                </CustomersList>

                <CustomersActions>
                    <button onClick={this.handleAddNew}>New Client</button>
                </CustomersActions>
            </div>
        )
    }

    render() {
        return (
            <div>
                <AppFrame header={"List Of Clients"} body={this.renderBody(customers)}/>
            </div>
        )
    }
}

CustomersContainer.propTypes = {
    fetchCustomers: PropTypes.func.isRequired,
}

export default withRouter(connect(null, fetchCustomers)(CustomersContainer))