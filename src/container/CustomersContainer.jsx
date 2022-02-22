import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import AppFrame from '../components/AppFrame';
import CustomersActions from '../components/CustomersActions';
import CustomersList from '../components/CustomersList';
import { fetchCustomers } from '../action/fetchCustomers';
import { getCustomers } from '../selectors/customers';

class CustomersContainer extends Component {

    componentDidMount() { 
        // if(this.props.customers.length === 0){
        // }
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
                <AppFrame header={"List Of Clients"} body={this.renderBody(this.props.customers)}/>
            </div>
        )
    }
}

CustomersContainer.propTypes = {
    fetchCustomers: PropTypes.func.isRequired,
    customers: PropTypes.array.isRequired
}

CustomersContainer.defaultProps = {
    customers: []
}

const mapStateToProps = state => ({
    customers: getCustomers(state)
});

export default withRouter(connect(mapStateToProps, { fetchCustomers })(CustomersContainer))