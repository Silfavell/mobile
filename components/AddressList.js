import React from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {
	deleteAddress,
	setSelectedAddress
} from '../actions/actions2'

import InteractiveSettingItem from './InteractiveSettingItem'
import DeleteAddressPopup from './popups/DeleteAddressPopup'

class AddressList extends React.PureComponent {
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
		<InteractiveSettingItem
			title={address.openAddress}
			onLeftClick={() => {
				this.props.setSelectedAddress(address._id, () => {
					this.props.navigation.goBack()
				})
			}}
			onRightIconClick={() => {
				this.setPopupState({ scaleAnimationModal: true, addressId: address._id })
			}}
		>
			<Ionicons color="rgba(0,0,0,.8)" name="md-locate" size={32} />
			<Ionicons color="rgba(0,0,0,.8)" name="md-trash" size={32} />
		</InteractiveSettingItem>
	)


	render() {
		return (
			<>
				<FlatList
					data={this.props.addresses}
					keyExtractor={(item) => item._id}
					renderItem={this.renderAddressItem}
					ListFooterComponent={this.props.footer}
				/>
				<DeleteAddressPopup scaleAnimationModal={this.state.scaleAnimationModal} setPopupState={this.setPopupState} />
			</>
		)
	}
}

const mapStateToProps = ({
	reducer2: {
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
