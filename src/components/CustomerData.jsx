import React from 'react';
import PropTypes from 'prop-types';

const CustomerData = ({ name, dni, age }) => {
    return (
        <div>
            <div className="customer-data">
                <h2>Clients Data</h2>
                <div><strong>Name: <i>{name}</i></strong></div>
                <div><strong>DNI: <i>{dni}</i></strong></div>
                <div><strong>Age: <i>{age}</i></strong></div>
            </div>
        </div>
    )
}

CustomerData.propTypes = {
    name: PropTypes.string.isRequired, 
    dni: PropTypes.number.isRequired, 
    age: PropTypes.number
}

export default CustomerData