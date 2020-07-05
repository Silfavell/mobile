import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { connect } from 'react-redux'
import {
	TouchableOpacity,
	Text,
	TextInput,
	View,
	StyleSheet
} from 'react-native'

import { decreaseProductQuantity, increaseProductQuantity, setProductQuantity } from '../actions/actions1'

class CartProductQuantityComponent extends React.Component {

	state = {
		quantity: this.props.previousOrder ? this.props.quantity : this.props.cart[this.props._id].quantity
	}

	onDecreaseClick = () => {
		this.props.decreaseProductQuantity(this.props._id)
	}

	onIncreaseClick = () => {
		this.props.increaseProductQuantity(this.props._id)
	}

	onQuantityChange = (quantity) => {
		this.setState({ quantity })
	}

	onFocusOut = () => {
		if (this.state.quantity === '') {
			this.setState({ quantity: 1 }, () => {
				this.props.setProductQuantity(this.props._id, parseInt(1))
			})
		} else {
			this.props.setProductQuantity(this.props._id, parseInt(this.state.quantity))
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ quantity: nextProps.previousOrder ? nextProps.quantity : nextProps.cart[this.props._id].quantity })
	}

	render() {
		const {
			previousOrder
		} = this.props

		return (
			<View style={styles.containerRow}>
				<View style={styles.child2} />

				<View style={styles.container}>

					{
						!previousOrder && (
							<TouchableOpacity disabled={previousOrder} onPress={this.onDecreaseClick} style={[styles.child, styles.decreaseButton]}>
								<Text style={styles.quantityButton}>-</Text>
							</TouchableOpacity>
						)
					}

					<View style={[styles.child, styles.quantityContainer]}>
						<TextInput
							editable={!previousOrder}
							keyboardType={'number-pad'}
							style={styles.quantityText}
							onBlur={this.onFocusOut}
							onChangeText={this.onQuantityChange}
							value={this.state.quantity.toString()} />
					</View>

					{
						!previousOrder && (
							<TouchableOpacity onPress={this.onIncreaseClick} style={[styles.child, styles.increaseButton]}>
								<Text style={styles.quantityButton}>+</Text>
							</TouchableOpacity>
						)
					}

				</View>

				<View style={styles.child2} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,.8)',
		flexDirection: 'row'
	},
	containerRow: {
		display: 'flex',
		flexDirection: 'row'
	},
	child: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	child2: {
		flex: .2
	},
	quantityContainer: {
		backgroundColor: 'rgba(0,0,0,.8)',
		paddingHorizontal: RFValue(4, 600)
	},
	quantityButton: {
		color: 'rgba(0,0,0,.8)',
		fontSize: RFValue(17, 600)
	},
	quantityText: {
		color: 'white',
		textAlign: 'center',
		fontSize: RFValue(17, 600),
		padding: 4
	},
	decreaseButton: {
		padding: RFValue(4, 600)
	},
	increaseButton: {
		padding: RFValue(4, 600)
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
	increaseProductQuantity,
	setProductQuantity
}

export default connect(mapStateToProps, mapDispatchToProps)(CartProductQuantityComponent)
