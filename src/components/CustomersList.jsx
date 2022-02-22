import React from 'react'
import PropTypes from 'prop-types'
import CustomerListItem from './CustomerListItem';

const CustomersList = ({ customers, urlPath }) => {
    return (
        <div>
            <div className="customers-list-item">
                {
                    customers.map(c => 
                        c && <CustomerListItem 
                            key={c.dni}
                            dni={c.dni}
                            name={c.name}
                            editAction={"Edit"}
                            delAction={"Delete"}
                            urlPath={urlPath} 
                        />)
                }
            </div>
        </div>
    )
}

CustomersList.propTypes = {
    customers: PropTypes.array.isRequired,
    urlPath: PropTypes.string.isRequired
}

export default CustomersList