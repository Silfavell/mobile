import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import {
	FlatList,
	View,
	Text
} from 'react-native'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'

import CartProduct from '../../components/CartProduct'
import CompletePayment from '../../components/CompletePayment'
import ShadowContainer from '../../components/ShadowContainer'

class CartScreen extends React.Component {
	products = Object.values(this.props.cart)

	keyExtractor = (item) => `cart${item._id}`

	onListProductsClick = () => {
		this.props.navigation.navigate('products')
	}

	renderCartProductItem = ({ item, index }) => {
		if (index === this.products.length - 1) {
			return (
				<ShadowContainer>
					<CartProduct data={item} />
				</ShadowContainer>
			)
		}

		return <CartProduct data={item} />
	}

	shouldComponentUpdate(nextProps) {
		// nextProps !== previousProps
		if (Object.values(nextProps.cart).length !== this.products.length) {
			return true
		}

		return false
	}

	render() {
		this.products = Object.values(this.props.cart)

		if (this.products.length > 0) {
			return (
				<View style={styles.container}>
					<FlatList
						style={styles.flatListStyle}
						data={this.products}
						keyExtractor={this.keyExtractor}
						renderItem={this.renderCartProductItem}
					/>
					<CompletePayment navigation={this.props.navigation} />
				</View>
			)
		}

		return (
			<View style={styles.emptyContainer}>
				<Ionicons name='md-basket' size={96} color='#BDBDBD' />
				<Text style={styles.emptyText}>Sepetinizde ürün bulunmamaktadır</Text>
			</View>
		)
	}
}

const styles = ScaledSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		paddingBottom: '65@s'
	},
	emptyContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#EDEDED'
	},
	emptyText: {
		marginTop: 32,
		fontSize: '18@s',
		textAlign: 'center',
		color: '#454545'
	},
	child: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	listProductsButtonContainer: {
		display: 'flex'
	},
	listProducts: {
		backgroundColor: 'rgba(0,0,0,.8)',
		borderRadius: 32,
		alignItems: 'center',
		justifyContent: 'center',
		margin: '18@s',
		padding: '18@s',
		paddingHorizontal: '48@s'
	},
	listProductsText: {
		color: 'white',
		fontSize: '19@s',
		alignItems: 'center',
		justifyContent: 'center'
	},
	footer: {
		height: '65@s',
		backgroundColor: 'transparent'
	},
	flatListStyle: {
		backgroundColor: '#DFDFDF'
	}
})

const mapStateToProps = ({
	cartReducer: {
		cart
	}
}) => ({
	cart
})

export default connect(mapStateToProps)(CartScreen)
