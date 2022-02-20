import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { setPropsAsInitial } from '../helpers/setPropsAsInitial';
import CustomersActions from './CustomersActions';

// const isRequired = value => (
//     !value && "This is required"
// )

const validate = values => {
    const error = {};

    if(!values.name) {
        error.name = "The name is required"
    }

    if(!values.dni) {
        error.dni = "The dni is required"
    }

    return error
}

const isNumber = value => (
    isNaN(Number(value)) && "It has to be a number"
)

const MyField = ({ input, meta, type, label, name }) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>

            <input {...input} type={ !type ? "text" : type } />
            {
                meta.touched && meta.error && <span>{meta.error}</span>
            }
        </div>
    )
}

const CustomerEdit = ({ name, dni, age, handleSubmit, submitting, onBack }) => {
    return (
        <div>
            <h2>Client Edit</h2>
            <form onSubmit={handleSubmit}>
                <Field 
                    name="name" 
                    component={MyField}
                    label="Name"
                />

                <Field 
                    name="dni" 
                    component={MyField}
                    validate={isNumber}
                    label="Dni"
                />

                <Field 
                    name="age" 
                    component={MyField} 
                    type="number"
                    validate={isNumber}
                    label="Age"
                />
                <CustomersActions>
                    <button type="submit" disabled={submitting}>Accept</button>
                    <button onClick={onBack}>Cancel</button>
                </CustomersActions>
            </form>
        </div>
    )
}

CustomerEdit.propTypes = {
    name: PropTypes.string, 
    dni: PropTypes.string, 
    age: PropTypes.number,
    onBack: PropTypes.func.isRequired
}

const CustomerEditForm = reduxForm(
    { 
        form: 'CustomerEdit',
        validate
    })(CustomerEdit)

export default setPropsAsInitial(CustomerEditForm);