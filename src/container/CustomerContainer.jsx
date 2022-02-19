import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppFrame from '../components/AppFrame';
import CustomerEdit from '../components/CustomerEdit';
import CustomerData from '../components/CustomerData';
import { getCustomerByDni } from '../selectors/customers';
import { Route } from 'react-router-dom';


class CustomerContainer extends Component {
    // <p>Data of the Client {this.props.customer.name}</p>
    renderBody = () => (
        <Route path="/customers/:dni/edit" children={
            ({ match }) => { 
                const CustomerControl = match ? CustomerEdit : CustomerData;
                return <CustomerControl {...this.props.customer}/> 
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
    customer: PropTypes.object.isRequired,
}

const mapStateToProps = (state, props) => ({
    customer: getCustomerByDni(state, props)
});

export default connect(mapStateToProps, null)(CustomerContainer)