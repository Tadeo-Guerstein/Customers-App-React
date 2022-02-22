import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { setPropsAsInitial } from '../helpers/setPropsAsInitial';
import CustomersActions from './CustomersActions';
import { Prompt } from 'react-router-dom';

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

const toNumber = value => value && Number(value)

const toUpper = value => value && value.toUpperCase()

const toLower = value => value && value.toLowerCase()

const onlyGrow = (value, previousValue, values) => 
    value && (!previousValue ? value : (value > previousValue ? value : previousValue));

const CustomerEdit = ({ 
    name, dni, age, handleSubmit, submitting, onBack, pristine, submitSucceeded }) => {
    return (
        <div>
            <h2>Client Edit</h2>
            <form onSubmit={handleSubmit}>
                <Field 
                    name="name" 
                    component={MyField}
                    label="Name: "
                    parse={toUpper}
                    format={toLower}
                />

                <Field 
                    name="dni" 
                    component={MyField}
                    label="Dni: "
                />

                <Field 
                    name="age" 
                    component={MyField} 
                    type="number"
                    validate={isNumber}
                    label="Age: "
                    parse={toNumber}
                    normalize={onlyGrow}
                />
                <CustomersActions>
                    <button type="submit" disabled={pristine || submitting}>
                        Accept
                    </button>
                    <button type="button" disabled={submitting} onClick={onBack}>
                        Cancel
                    </button>
                </CustomersActions>
                <Prompt 
                    when={!pristine && !submitSucceeded}
                    message="Your going to lose the changes. Do you want to continue?"/>
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