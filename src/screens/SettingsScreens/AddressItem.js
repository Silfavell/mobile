import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import {
    deleteAddress,
    setSelectedAddress
} from '../../actions/payment-actions'
import InteractiveSettingItem from './InteractiveSettingItem'

class AddressList extends React.PureComponent {
    onLeftClick = () => {
        this.props.setSelectedAddress(this.props.address._id, this.props.navigation.goBack)
    }

    onRightIconClick = () => {
        this.props.setPopupState({ scaleAnimationModal: true, addressId: this.props.address._id })
    }

    render() {
        return (
            <InteractiveSettingItem
                title={this.props.address.openAddress}
                onLeftClick={this.onLeftClick}
                onRightIconClick={this.onRightIconClick}>
                <Ionicons color='rgba(0,0,0,.8)' name='md-locate' size={32} />
                <Ionicons color='rgba(0,0,0,.8)' name='md-trash' size={32} />
            </InteractiveSettingItem>
        )
    }
}

const mapDispatchToProps = {
    setSelectedAddress,
    deleteAddress
}

export default connect(null, mapDispatchToProps)(AddressList)
