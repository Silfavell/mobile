import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { connect } from 'react-redux'
import {
	TouchableOpacity,
	Text,
	View,
	StyleSheet
} from 'react-native'

import { decreaseProductQuantity, increaseProductQuantity } from '../actions/actions1'

class CartProductQuantityComponent extends React.PureComponent {
	onDecreaseClick = () => {
		this.props.decreaseProductQuantity(this.props._id)
	}

	onIncreaseClick = () => {
		this.props.increaseProductQuantity(this.props._id)
	}

	render() {
		const {
			_id,
			cart,
			quantity,
			previousOrder
		} = this.props

		if (previousOrder) {
			return (
				<>
					<View style={styles.child} />
					<View style={[styles.child, styles.quantityContainer]}>
						<Text style={styles.quantityText}>{quantity}</Text>
					</View>
					<View style={styles.child} />
				</>
			)
		}

		return (
			<>
				<TouchableOpacity onPress={this.onDecreaseClick} style={[styles.child, styles.decreaseButton]}>
					<Text style={styles.quantityButton}>-</Text>
				</TouchableOpacity>

				<View style={[styles.child, styles.quantityContainer]}>
					<Text style={styles.quantityText}>{cart[_id].quantity}</Text>
				</View>

				<TouchableOpacity onPress={this.onIncreaseClick} style={[styles.child, styles.increaseButton]}>
					<Text style={styles.quantityButton}>+</Text>
				</TouchableOpacity>
			</>
		)
	}
}

const styles = StyleSheet.create({
	child: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	quantityContainer: {
		backgroundColor: 'rgba(0,0,0,.8)',
		padding: RFValue(4, 600)
	},
	quantityButton: {
		color: 'rgba(0,0,0,.8)',
		fontSize: RFValue(17, 600)
	},
	quantityText: {
		color: 'white',
		fontSize: RFValue(17, 600)
	},
	decreaseButton: {
		padding: RFValue(4, 600),
		borderTopLeftRadius: RFValue(10, 600),
		borderBottomLeftRadius: RFValue(10, 600)
	},
	increaseButton: {
		padding: RFValue(4, 600),
		borderTopRightRadius: RFValue(10, 600),
		borderBottomRightRadius: RFValue(10, 600)
	}
})

const mapStateToProps = ({
	reducer1: {
		cart
	}
}) => ({
	cart
})

const mapDispatchToProps = {
	decreaseProductQuantity,
	increaseProductQuantity
}

export default connect(mapStateToProps, mapDispatchToProps)(CartProductQuantityComponent)
