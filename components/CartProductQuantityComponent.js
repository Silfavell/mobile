import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import { connect } from 'react-redux'
import {
	TouchableOpacity,
	Text,
	TextInput,
	View
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

	UNSAFE_componentWillReceiveProps(nextProps) {
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

const styles = ScaledSheet.create({
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
		paddingHorizontal: '4@s'
	},
	quantityButton: {
		color: 'rgba(0,0,0,.8)',
		fontSize: '17@s'
	},
	quantityText: {
		color: 'white',
		textAlign: 'center',
		fontSize: '17@s',
		padding: 4
	},
	decreaseButton: {
		padding: '4@s'
	},
	increaseButton: {
		padding: '4@s'
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
