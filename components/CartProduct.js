import React from 'react'
import {
	View,
	Image,
	Text,
	StyleSheet
} from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { SERVER_URL } from '../utils/global'

import CartProductQuantityComponent from './CartProductQuantityComponent'

class CartProduct extends React.PureComponent {
	render() {
		const {
			data: {
				_id,
				name,
				price,
				discountedPrice,
				image,
				quantity
			},
			previousOrder,
			lastItem
		} = this.props

		const url = `${SERVER_URL}/assets/products/${image}-0.webp`

		return (
			<View style={styles.container}>

				<View style={[styles.child, styles.flex2, styles.imageContainer]}>
					<Image
						style={styles.productImage}
						resizeMode='contain'
						source={{ uri: url }}
					/>
				</View>

				<View style={[styles.child, styles.flex3, styles.column]}>
					<View style={styles.child} />
					<View style={styles.textContainer}>
						<Text style={styles.productName} numberOfLines={3}>{name}</Text>
					</View>
					<View style={styles.child} />
					<View style={[styles.textContainer, styles.priceContainer]}>
						<Text style={[styles.productPrice, discountedPrice ? styles.discountedPrice : {}]}>{`₺${price.toFixed(2).toString().replace('.', ',')}`}</Text>

						{
							discountedPrice && (
								<Text style={styles.productPrice}>{`₺${discountedPrice.toFixed(2).toString().replace('.', ',')}`}</Text>
							)
						}
					</View>
					<View style={styles.rowChild}>
						<View style={styles.child} />
						<CartProductQuantityComponent _id={_id} previousOrder={previousOrder} quantity={quantity} />
						<View style={styles.child} />
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		padding: RFValue(4, 600),
		paddingVertical: RFValue(12, 600),
		borderBottomWidth: 1,
		borderBottomColor: '#EFEFEF',
		backgroundColor: 'white'
	},
	child: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	flex2: {
		flex: 1.6
	},
	flex3: {
		flex: 3
	},
	column: {
		flexDirection: 'column',
		display: 'flex'
	},
	rowChild: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		display: 'flex'
	},
	textContainer: {
		width: '100%',
		paddingHorizontal: RFValue(8, 600),
		justifyContent: 'center',
		alignItems: 'center'
	},
	priceContainer: {
		flexDirection: 'row'
	},
	productName: {
		fontSize: RFPercentage(2.6),
		fontWeight: '700',
		color: '#454545',
		textAlign: 'center',
		justifyContent: 'center'
	},
	productPrice: {
		fontSize: RFPercentage(3.1),
		fontWeight: '700',
		color: 'rgba(0,0,0,.8)',
		textAlign: 'center',
		justifyContent: 'center',
		marginRight: 8
	},
	discountedPrice: {
		fontWeight: 'normal',
		fontWeight: '100',
		marginRight: 8,
		textDecorationLine: 'line-through'
	},
	imageContainer: {
		padding: RFValue(4, 600),
		backgroundColor: 'white'
	},
	productImage: {
		width: '100%',
		height: null,
		aspectRatio: 0.6,
		borderWidth: 1,
		borderColor: '#EFEFEF',
	}
})

export default CartProduct
