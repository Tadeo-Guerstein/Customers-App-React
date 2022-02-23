import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppFrame from '../components/AppFrame';
import CustomerEdit from '../components/CustomerEdit';
import CustomerData from '../components/CustomerData';
import { getCustomerByDni } from '../selectors/customers';
import { Route, withRouter } from 'react-router-dom';
import { fetchCustomers } from '../action/fetchCustomers';
import { updateCustomer } from '../action/updateCustomer';
import { deleteCustomer } from '../action/deleteCustomer';
import { SubmissionError } from 'redux-form';

class CustomerContainer extends Component {

    componentDidMount() {
        if(!this.props.customer){
            this.props.fetchCustomers();
        }
    }

    handleSubmit = values => {
        const { id } = values;
        return this.props.updateCustomer(id, values).then(r => {
            if(r.payload && r.payload.error){
                throw new SubmissionError(r.payload)
            }
        });
    }

    handleOnBack = () => {
        this.props.history.goBack();
    }

    handleOnSubmitSuccess = () => {
        this.props.history.goBack();
    }

    handleOnDelete = id => {
        this.props.deleteCustomer(id).then(this.props.history.goBack())
    }

    renderCustomerControl = (isEdit, isDelete) => {
        const CustomerControl = isEdit ? CustomerEdit : CustomerData;
        return <CustomerControl 
            { ...this.props.customer} 
            onSubmit={this.handleSubmit}
            onSubmitSuccess={this.handleOnSubmitSuccess}
            onBack={this.handleOnBack}
            isDeleteAllow={!!isDelete}
            onDelete={this.handleOnDelete}
        /> 
    }

    renderBody = () => (
        <Route path="/customers/:dni/edit" children={
            ({ match: isEdit }) => (
                <Route path="/customers/:dni/del" children={
                    ({ match: isDelete }) => (
                        this.renderCustomerControl(isEdit, isDelete)
                    ) 
                }/>
            )
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
    updateCustomer: PropTypes.func.isRequired,
    deleteCustomer: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => ({
    customer: getCustomerByDni(state, props)
});

export default withRouter(connect(mapStateToProps, { fetchCustomers, updateCustomer, deleteCustomer })(CustomerContainer))