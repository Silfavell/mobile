import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import {
	FlatList,
	View,
	Text,
	StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'

import CartProduct from '../components/CartProduct'
import CompletePayment from '../components/CompletePayment'
import ShadowContainer from '../components/ShadowContainer'


class CartScreen extends React.PureComponent {
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


	render() {
		this.products = Object.values(this.props.cart)

		if (this.products.length > 0) {
			return (
				<View style={styles.container}>
					<FlatList
						style={{ backgroundColor: '#DFDFDF' }}
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
				<Text style={styles.emptyText}>Sepetinizde ürün bulunmamaktadır.</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		paddingBottom: RFValue(65, 600)
	},
	emptyContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#EDEDED'
	},
	emptyText: {
		marginTop: 32,
		fontSize: RFValue(18, 600),
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
		margin: RFValue(18, 600),
		padding: RFValue(18, 600),
		paddingHorizontal: RFValue(48, 600)
	},
	listProductsText: {
		color: 'white',
		fontSize: RFValue(19, 600),
		alignItems: 'center',
		justifyContent: 'center'
	},
	footer: {
		height: RFValue(65, 600),
		backgroundColor: 'transparent'
	}
})

const mapStateToProps = ({
	reducer1: {
		cart
	}
}) => ({
	cart
})

export default connect(mapStateToProps)(CartScreen)
