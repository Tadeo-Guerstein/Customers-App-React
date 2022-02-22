import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame'
import CustomerEdit from '../components/CustomerEdit';import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { insertCustomer } from '../action/insertCustomer';
// import { SubmissionError } from 'redux-form';

class NewCustomerContainer extends Component {

    // .then(r => {
    //     if(r.payload && r.payload.error){
    //         throw new SubmissionError(r.payload)
    //     }
    // })

    handleSubmit = values => {
        this.props.insertCustomer(values)    
    }

    handleOnSubmitSuccess = () => {
        this.props.history.goBack();
    }

    handleOnBack = () => {
        this.props.history.goBack();
    }

    renderBody = () => {
        const newCustomer = {
            "id": "",
            "dni": "",
            "name": "",
            "age": 0
        }
        return <CustomerEdit 
            {...newCustomer}
            onSubmit={this.handleSubmit}
            onSubmitSuccess={this.handleOnSubmitSuccess}
            onBack={this.handleOnBack}
        />
    }

    render() {
        return (
            <div>
                <AppFrame 
                    header={`Creation of new client`}
                    body={this.renderBody()}>
                </AppFrame>
            </div>
        )
    }
}

NewCustomerContainer.propTypes = {
    insertCustomer: PropTypes.func.isRequired,
}

export default withRouter(connect(null, { insertCustomer })(NewCustomerContainer));