import React from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity,StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { s } from 'react-native-size-matters'

import { setClearCartPopupState } from '../actions/global-actions'

class HeaderRight extends React.PureComponent {
	onClearClick = () => {
		this.props.setClearCartPopupState(true)
	}

	render() {
		if (Object.values(this.props.cart).length > 0) {
			return (
				<TouchableOpacity style={styles.marginRight} onPress={this.onClearClick}>
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
	marginRight: {
		marginRight: s(18) 
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderRight)
