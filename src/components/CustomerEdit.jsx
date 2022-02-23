import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { setPropsAsInitial } from '../helpers/setPropsAsInitial';
import CustomersActions from './CustomersActions';
import { Prompt } from 'react-router-dom';
import { accessControl } from '../helpers/accessControl';
import { CUSTOMER_EDIT } from '../constants/permissions';

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

const toNumber = value => value && Number(value)

const onlyGrow = (value, previousValue, values) => 
    value && (!previousValue ? value : (value > previousValue ? value : previousValue));

class CustomerEdit extends Component {

    componentDidMount() { 
        if(this.txt){
            this.txt.focus()
        }
    }

    renderField = ({ input, meta, type, label, name, withFocus }) => {
        const controls = {...input, value: input["value"] || ""}
        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <input 
                    {...controls} 
                    type={ !type ? "text" : type } 
                    ref={withFocus && (txt => this.txt = txt)} 
                />
                {
                    meta.touched && meta.error && <span>{meta.error}</span>
                }
            </div>
        )
    }

    render(){
        const { handleSubmit, submitting, onBack, pristine, submitSucceeded } = this.props
        return (
            <div>
                <h2>Client Edit</h2>
                <form onSubmit={handleSubmit}>
                    <Field 
                        withFocus
                        name="name" 
                        component={this.renderField}
                        label="Name: "
                    />
    
                    <Field 
                        name="dni" 
                        component={this.renderField}
                        label="Dni: "
                    />
    
                    <Field 
                        name="age" 
                        component={this.renderField} 
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

export default accessControl([CUSTOMER_EDIT])(setPropsAsInitial(CustomerEditForm));