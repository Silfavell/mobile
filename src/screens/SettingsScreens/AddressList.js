import React from 'react'

import { FlatList } from 'react-native'
import { connect } from 'react-redux'

import {
    deleteAddress,
    setSelectedAddress
} from '../../actions/payment-actions'
import DeleteAddressPopup from '../../components/popups/DeleteAddressPopup'
import AddressItem from './AddressItem'

class AddressList extends React.Component {
    state = {
        addressId: '',
        scaleAnimationModal: false
    }

    setPopupState = (state, deleteStatus) => {
        this.setState(state)

        if (deleteStatus) {
            this.props.deleteAddress(this.state.addressId)
        }
    }

    renderAddressItem = ({ item: address }) => (
        <AddressItem
            address={address}
            navigation={this.props.navigation}
            setSelectedAddress={this.props.setSelectedAddress}
            setPopupState={this.setPopupState} />
    )

    keyExtractor = (item) => item._id

    render() {
        return (
            <>
                <FlatList
                    data={this.props.addresses}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderAddressItem}
                    ListFooterComponent={this.props.footer} />
                <DeleteAddressPopup scaleAnimationModal={this.state.scaleAnimationModal} setPopupState={this.setPopupState} />
            </>
        )
    }
}

const mapStateToProps = ({
    paymentReducer: {
        addresses
    }
}) => ({
    addresses
})

const mapDispatchToProps = {
    setSelectedAddress,
    deleteAddress
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressList)
