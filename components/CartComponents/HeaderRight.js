import React from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { setClearCartPopupState } from '../../actions/global-actions'

class HeaderRight extends React.PureComponent {
	onClearClick = () => {
		this.props.setClearCartPopupState(true)
	}

	render() {
		if (Object.values(this.props.cart).length > 0) {
			return (
				<TouchableOpacity style={{ marginRight: 16 }} onPress={this.onClearClick}>
					<Ionicons name="md-trash" size={26} color="white" />
				</TouchableOpacity>
			)
		}
		return null
	}
}

const mapStateToProps = ({
	reducer1: {
		cart,
	},
}) => ({
	cart,
})

const mapDispatchToProps = {
	setClearCartPopupState,
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderRight)
