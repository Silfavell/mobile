import React from 'react'
import {
	TouchableOpacity,
	View,
	Text,
	Image
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { ScaledSheet } from 'react-native-size-matters'

import { SERVER_URL } from '../utils/global'

import { increaseProductQuantity } from '../actions/actions1'
import { addToFavoriteProducts, removeFromFavoriteProdutcs } from '../actions/actions4'

class Product extends React.Component {
	onAddProductClick = () => {
		this.props.increaseProductQuantity(this.props.data._id, this.props.messagePopupRef)
	}

	addToFavoriteProducts = () => {
		this.props.addToFavoriteProducts(this.props.data._id, this.props.messagePopupRef)
	}

	removeFromFavoriteProdutcs = () => {
		this.props.removeFromFavoriteProdutcs(this.props.data._id, this.props.messagePopupRef)
	}

	onProductClick = () => {
		this.props.navigation.navigate('fullProductScreen', this.props.data.slug)
	}

	shouldComponentUpdate(nextProps) {
		return (
			nextProps.user?.favoriteProducts?.includes(this.props.data._id) && !this.props.user?.favoriteProducts?.includes(this.props.data._id) ||
			this.props.user?.favoriteProducts?.includes(this.props.data._id) && !nextProps.user?.favoriteProducts?.includes(this.props.data._id)
		)
	}

	render() {
		const {
			data: {
				_id,
				name,
				price,
				discountedPrice,
				image
			},
			token
		} = this.props

		const url = `${SERVER_URL}/assets/products/${image}-0.webp`

		return (
			<View style={styles.container}>

				{
					token && (
						<Ionicons
							style={styles.favoriteIcon}
							size={28}
							name={this.props.user?.favoriteProducts?.includes(_id) ? 'md-heart' : 'md-heart-empty'}
							color={'rgba(0,0,0,.8)'}
							onPress={this.props.user?.favoriteProducts?.includes(_id) ? this.removeFromFavoriteProdutcs : this.addToFavoriteProducts}
						/>
					)
				}

				<TouchableOpacity activeOpacity={1} style={[styles.child, styles.productImageContainer]} onPress={this.onProductClick}>
					<Image
						source={{ uri: url }}
						resizeMode='contain'
						style={styles.productImage}
					/>

					<Ionicons style={styles.basketIcon} size={28} name={'md-basket'} color={'rgba(0,0,0,.8)'} onPress={this.onAddProductClick} />
				</TouchableOpacity>

				<View style={[styles.child, styles.priceContainer]}>
					<Text style={[styles.productPrice, discountedPrice ? styles.discountedPrice : {}]}>{`₺${price.toFixed(2).toString().replace('.', ',')}`}</Text>

					{
						discountedPrice && (
							<Text style={styles.productPrice}>{`₺${discountedPrice.toFixed(2).toString().replace('.', ',')}`}</Text>
						)
					}
				</View>

				<View style={[styles.child, styles.nameContainer]}>
					<Text numberOfLines={3} style={styles.productName}>{name}</Text>
				</View>

			</View>
		)
	}
}


const styles = ScaledSheet.create({
	container: {
		flexDirection: 'column',
		padding: '6@s',
		marginVertical: '12@s',
		zIndex: -1,
		backgroundColor: 'transparent',
		borderWidth: 1,
		borderColor: '#EFEFEF',
		borderBottomColor: '#EE4266',
		marginHorizontal: '6@s',
		height: '95%'
	},
	favoriteIcon: {
		position: 'absolute',
		top: '10@vs',
		right: 15,
		zIndex: 1
	},
	basketIcon: {
		position: 'absolute',
		bottom: 10,
		right: 2,
		zIndex: 1
	},
	priceContainer: {
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row'
	},
	nameContainer: {
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		flex: 1
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
		paddingBottom: '6@s'
	},
	productName: {
		fontSize: '14@s',
		fontWeight: '600',
		color: '#454545',
		textAlign: 'left',
		justifyContent: 'center'
	},
	productPrice: {
		fontSize: '16@s',
		fontWeight: 'bold',
		color: '#454545',
		textAlign: 'left',
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	discountedPrice: {
		fontWeight: 'normal',
		fontWeight: '100',
		marginRight: 8,
		textDecorationLine: 'line-through'
	}
})

const mapStateToProps = ({
	reducer4: {
		token,
		user
	},
	globalReducer: {
		messagePopupRef
	}
}) => ({
	token,
	user,
	messagePopupRef
})

const mapDispatchToProps = {
	increaseProductQuantity,
	addToFavoriteProducts,
	removeFromFavoriteProdutcs
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
