import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppFrame from '../components/AppFrame';
import CustomerEdit from '../components/CustomerEdit';
import CustomerData from '../components/CustomerData';
import { getCustomerByDni } from '../selectors/customers';
import { Route, withRouter } from 'react-router-dom';
import { fetchCustomers } from '../action/fetchCustomers';
import { updateCustomer } from '../action/updateCustomer'

class CustomerContainer extends Component {

    componentDidMount() {
        if(!this.props.customer){
            this.props.fetchCustomers();
        }
    }

    handleSubmit = values => {
        const { id } = values
        this.props.updateCustomer(id, values)
    }

    handleOnBack = () => {
        this.props.history.goBack();
    }

    renderBody = () => (
        <Route path="/customers/:dni/edit" children={
            ({ match }) => { 
                const CustomerControl = match ? CustomerEdit : CustomerData;
                return <CustomerControl 
                    { ...this.props.customer} 
                    onSubmit={this.handleSubmit}
                    onBack={this.handleOnBack}/> 
            }
        }/>
    )
    
    render() {
        return (
        <div>
            <AppFrame header={`Client ${this.props.customer.name}`}
                body={this.renderBody()}>
            </AppFrame>
        </div>
        )
    }
}

CustomerContainer.propTypes = {
    dni: PropTypes.string.isRequired,
    customer: PropTypes.object,
    fetchCustomers: PropTypes.func.isRequired,
    updateCustomer: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => ({
    customer: getCustomerByDni(state, props)
});

export default withRouter(connect(mapStateToProps, { fetchCustomers, updateCustomer })(CustomerContainer))