import React from 'react'
import PropTypes from 'prop-types'

const CustomerEdit = ({ name, dni, age }) => {
    return (
        <div>
            <h2>Client Edit</h2>
            <h3>Name: {name} / DNI: {dni} / Age: {age}</h3>
        </div>
    )
}

CustomerEdit.propTypes = {
    name: PropTypes.string.isRequired, 
    dni: PropTypes.number.isRequired, 
    age: PropTypes.number
}

export default CustomerEdit