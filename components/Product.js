import React from 'react'
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize'
import {
	TouchableOpacity,
	View,
	Text,
	Image,
	StyleSheet
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { SERVER_URL } from '../utils/global'

import { increaseProductQuantity } from '../actions/actions1'
import { addToFavoriteProducts, removeFromFavoriteProdutcs } from '../actions/actions4'

import productEx from '../assets/product.jpg'

class Product extends React.PureComponent {
	onAddProductClick = () => {
		this.props.increaseProductQuantity(this.props.data._id)
	}

	addToFavoriteProducts = () => {
		if (this.props.token) {
			this.props.addToFavoriteProducts(this.props.data._id)
		} else {
			this.props.navigation.navigate('Welcome', { screen: 'login' })
		}
	}

	removeFromFavoriteProdutcs = () => {
		if (this.props.token) {
			this.props.removeFromFavoriteProdutcs(this.props.data._id)
		} else {
			this.props.navigation.navigate('Welcome', { screen: 'login' })
		}
	}

	onProductClick = () => {		
		this.props.navigation.navigate('fullProductScreen', this.props.data)
	}

	shouldComponentUpdate(nextProps) {
		return (
			nextProps.user?.favoriteProducts.includes(this.props.data._id) && !this.props.user?.favoriteProducts.includes(this.props.data._id) ||
			this.props.user?.favoriteProducts.includes(this.props.data._id) && !nextProps.user?.favoriteProducts.includes(this.props.data._id)
		)
	}

	render() {
		const {
			data: {
				_id,
				name,
				price,
				categoryId,
				image
			}
		} = this.props

		const url = `${SERVER_URL}/assets/products-2/${categoryId}/${image}.webp`

		return (
			<View style={styles.container}>

				<Ionicons
					style={styles.favoriteIcon}
					size={28}
					name={this.props.user?.favoriteProducts.includes(_id) ? 'md-heart' : 'md-heart-empty'}
					color={'rgba(0,0,0,.8)'}
					onPress={this.props.user?.favoriteProducts.includes(_id) ? this.removeFromFavoriteProdutcs : this.addToFavoriteProducts}
				/>

				<TouchableOpacity activeOpacity={1} style={[styles.child, styles.productImageContainer]} onPress={this.onProductClick}>
					<Image
						// source={{ uri: url }}
						source={productEx}
						resizeMode='contain'
						style={styles.productImage}
					/>

					<Ionicons style={styles.basketIcon} size={28} name={'md-basket'} color={'rgba(0,0,0,.8)'} onPress={this.onAddProductClick} />
				</TouchableOpacity>

				<Text style={[styles.child, styles.productPrice]}>{`₺${price.toFixed(2).toString().replace('.', ',')}`}</Text>

				<Text numberOfLines={3} style={[styles.productName, styles.child]}>{name}</Text>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		padding: RFPercentage(1),
		marginVertical: RFPercentage(2),
		zIndex: -1,
		backgroundColor: 'transparent',
		borderWidth: 1,
		borderColor: '#EFEFEF',
		borderBottomColor: 'red',
		marginHorizontal: 6,
		height: '95%'
	},
	favoriteIcon: {
		position: 'absolute',
		top: 10,
		right: 15,
		zIndex: 1
	},
	basketIcon: {
		position: 'absolute',
		bottom: 10,
		right: 2,
		zIndex: 1
	},
	child: {
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 6,
		marginVertical: 1
	},
	productImageContainer: {
		backgroundColor: 'white'
	},
	productImage: {
		width: '100%',
		height: null,
		aspectRatio: 0.6,
		paddingBottom: RFValue(6, 600)
	},
	productName: {
		fontSize: RFPercentage(2.6),
		fontWeight: '600',
		color: 'rgba(0,0,0,.8)',
		textAlign: 'left',
		justifyContent: 'center'
	},
	productPrice: {
		fontSize: RFPercentage(2.9),
		fontWeight: '700',
		color: 'rgba(0,0,0,.8)',
		textAlign: 'left',
		justifyContent: 'center',
		alignItems: 'flex-start'
	}
})

const mapStateToProps = ({
	reducer4: {
		token,
		user
	}
}) => ({
	token,
	user
})

const mapDispatchToProps = {
	increaseProductQuantity,
	addToFavoriteProducts,
	removeFromFavoriteProdutcs
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
