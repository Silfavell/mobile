import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import { connect } from 'react-redux'
import {
	TouchableOpacity,
	Text,
	TextInput,
	View
} from 'react-native'

import { decreaseProductQuantity, increaseProductQuantity, setProductQuantity } from '../actions/cart-actions'

class CartProductQuantityComponent extends React.Component {
	state = {}

	componentDidMount() {
		let quantity = 1
		if (this.props.previousOrder) {
			quantity = this.props.quantity
		} else if (this.props.returnItem) {

		} else {
			quantity = this.props.cart[this.props._id].quantity
		}

		this.setState({ quantity })
	}

	static getDerivedStateFromProps(props) {
		if (!props.returnItem) {
			if (props.previousOrder) {
				return ({ quantity: props.previousOrder })
			}

			if (props.cart[props._id]) {
				return ({ quantity: props.cart[props._id].quantity })
			}
		}

		return null
	}

	onDecreaseClick = () => {
		if (this.props.returnItem) {
			this.setState({
				quantity: this.props.returnItem.decreaseProductQuantity(this.props._id)
			})
		} else {
			this.props.decreaseProductQuantity(this.props._id)
		}
	}

	onIncreaseClick = () => {
		if (this.props.returnItem) {
			this.setState({
				quantity: this.props.returnItem.increaseProductQuantity(this.props._id)
			})
		} else {
			this.props.increaseProductQuantity(this.props._id)
		}
	}

	onQuantityChange = (quantity) => {
		this.setState({ quantity })
	}

	onFocusOut = () => {
		const { quantity } = this.state

		if (quantity === '') {
			this.setState({ quantity: 1 }, () => {
				if (this.props.returnItem) {
					this.setState({
						quantity: this.props.returnItem.setProductQuantity(this.props._id, 1)
					})
				} else {
					this.props.setProductQuantity(this.props._id, 1)
				}
			})
		} else if (this.props.returnItem) {
			this.setState({
				quantity: this.props.returnItem.setProductQuantity(this.props._id, parseInt(quantity, 10))
			})
		} else {
			this.props.setProductQuantity(this.props._id, parseInt(quantity, 10))
		}
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
							keyboardType='number-pad'
							style={styles.quantityText}
							onBlur={this.onFocusOut}
							onChangeText={this.onQuantityChange}
							value={this.state?.quantity.toString()}
						/>
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
		flex: 0.2
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
	cartReducer: {
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