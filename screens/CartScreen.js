import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import {
	FlatList, View, TouchableOpacity, Text, StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'

import CardProduct from '../components/CardProduct'
import CompletePayment from '../components/CompletePayment'
import ShadowContainer from '../components/ShadowContainer'

const renderCardProductItem = ({ item }) => <CardProduct data={item} />

class CartScreen extends React.PureComponent {
	//  shouldComponentUpdate(nextProps) {
	//      console.log(Object.values(this.props.cart).length, Object.values(nextProps.cart).length)
	//      if (Object.values(this.props.cart).length !== Object.values(nextProps.cart).length)
	//          return true
	//
	//      return false
	//  }

	keyExtractor = (item) => `cart${item._id}`

	onListProductsClick = () => {
		this.props.navigation.navigate('products')
	}

	render() {
		const products = Object.values(this.props.cart)

		if (products.length > 0) {
			return (
				<View style={styles.container}>
					<ShadowContainer>
						<FlatList
							data={products}
							keyExtractor={this.keyExtractor}
							renderItem={renderCardProductItem}
						/>
					</ShadowContainer>
					<View style={styles.footer} />
					<CompletePayment navigation={this.props.navigation} />
				</View>
			)
		}
		return (
			<View style={styles.emptyCartContainer}>
				<View style={styles.child} />
				<View style={styles.child} />
				<View style={styles.child} />
				<View style={styles.child}>
					<Ionicons name="md-basket" size={96} color="#BDBDBD" />
				</View>
				<View style={styles.child} />
				<View style={styles.child}>
					<Text style={styles.emptyCartText}>Sepetinizde ürün bulunmamaktadır.</Text>
				</View>
				<View style={styles.child} />
				<View style={[styles.child, styles.listProductsButtonContainer]}>
					<TouchableOpacity onPress={this.onListProductsClick} style={styles.listProducts}>
						<Text style={styles.listProductsText}>ÜRÜNLERİ LİSTELE</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.child} />
				<View style={styles.child} />
				<View style={styles.child} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'space-between' },
	emptyCartContainer: {
		flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EDEDED'
	},
	child: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	emptyCartText: { fontSize: RFValue(18, 600), textAlign: 'center', color: '#454545' },
	listProductsButtonContainer: { display: 'flex' },
	listProducts: {
		backgroundColor: '#DB0099',
		borderRadius: 32,
		alignItems: 'center',
		justifyContent: 'center',
		margin: RFValue(18, 600),
		padding: RFValue(18, 600),
		paddingHorizontal: RFValue(48, 600)
	},
	listProductsText: {
		color: 'white', fontSize: RFValue(19, 600), alignItems: 'center', justifyContent: 'center'
	},
	footer: {
		height: RFValue(65, 600),
		backgroundColor: 'transparent'
	}
})

const mapStateToProps = ({
	reducer1: {
		cart
	},
}) => ({
	cart
})

export default connect(mapStateToProps)(CartScreen)
