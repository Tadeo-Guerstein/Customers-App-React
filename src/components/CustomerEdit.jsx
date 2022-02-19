import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

const CustomerEdit = ({ name, dni, age }) => {
    return (
        <div>
            <h2>Client Edit</h2>
            <form action="">
                <div>
                    <label htmlFor="name">Name </label>
                    <Field name="name" component="input" type="text"></Field>
                </div>
                <div>
                    <label htmlFor="dni">DNI: </label>
                    <Field name="dni" component="input" type="text"></Field>
                </div>
                <div>
                    <label htmlFor="age">Age: </label>
                    <Field name="age" component="input" type="number"></Field>
                </div>
            </form>
        </div>
    )
}

CustomerEdit.propTypes = {
    name: PropTypes.string, 
    dni: PropTypes.string, 
    age: PropTypes.number
}

const CustomerEditForm = reduxForm({ form: 'CustomerEdit' })(CustomerEdit)

export default connect((state, props) => ({ initialValues: props }), null)(CustomerEditForm);