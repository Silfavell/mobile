import React from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { s } from 'react-native-size-matters'

class HeaderLeft extends React.PureComponent {
	onBackClick = () => {
		this.props.navigation.goBack()
	}

	render() {
		if (Object.values(this.props.cart).length > 0) {
			return (
				<TouchableOpacity style={{ marginLeft: s(18) }} onPress={this.onBackClick}>
					<Ionicons name='md-close' size={26} color='white' />
				</TouchableOpacity>
			)
		}
		return null
	}
}

const mapStateToProps = ({
	reducer1: {
		cart
	}
}) => ({
	cart
})

export default connect(mapStateToProps)(HeaderLeft)
