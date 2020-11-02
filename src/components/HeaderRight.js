import React from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { s } from 'react-native-size-matters'

import { setClearCartPopupState } from '../actions/global-actions'

class HeaderRight extends React.Component {
	onClearClick = () => {
		this.props.setClearCartPopupState(true)
	}

	shouldComponentUpdate(nextProps) {
		if (Object.values(nextProps.cart).length === 1 || Object.values(nextProps.cart).length === 0) {
			return true
		}

		return false
	}

	render() {
		if (Object.values(this.props.cart).length > 0) {
			return (
				<TouchableOpacity style={styles.iconContainer} onPress={this.onClearClick}>
					<Ionicons name='md-trash' size={26} color='white' />
				</TouchableOpacity>
			)
		}

		return null
	}
}

const mapStateToProps = ({
	cartReducer: {
		cart
	}
}) => ({
	cart
})

const mapDispatchToProps = {
	setClearCartPopupState
}

const styles = StyleSheet.create({
	iconContainer: {
		marginRight: s(18)
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderRight)
