import React from 'react'

import AddressesFooter from './AddressesFooter'
import AddressList from './AddressList'

class AddressesScreen extends React.PureComponent {
    render() {
        return (
            <AddressList
                navigation={this.props.navigation}
                footer={<AddressesFooter navigation={this.props.navigation} />} />
        )
    }
}

export default AddressesScreen
