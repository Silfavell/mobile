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

import productEx from '../assets/product.jpg'

class CartProduct extends React.PureComponent {
	render() {
		const {
			data: {
				_id,
				name,
				price,
				category,
				image,
				quantity
			},
			previousOrder
		} = this.props

		const url = `${SERVER_URL}/assets/products-2/${category}/${image}.webp`

		return (
			<View style={styles.container}>

				<View style={[styles.child, styles.flex2, styles.imageContainer]}>
					<Image
						style={styles.productImage}
						resizeMode="cover"
						// source={{ uri: url }}
						source={productEx}
					/>
				</View>

				<View style={[styles.child, styles.flex3, styles.column]}>
					<View style={styles.child} />
					<View style={styles.textContainer}>
						<Text style={styles.productName} numberOfLines={3}>{name}</Text>
					</View>
					<View style={styles.child} />
					<View style={styles.textContainer}>
						<Text style={styles.productPrice} numberOfLines={3}>{`₺${price.toFixed(2).toString().replace('.', ',')}`}</Text>
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
		borderBottomColor: '#EFEFEF'
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
		color: '#DB0099',
		textAlign: 'center',
		justifyContent: 'center'
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
