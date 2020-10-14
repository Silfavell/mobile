import React from 'react'
import {
	View,
	Image,
	Text
} from 'react-native'
import Config from 'react-native-config'

import { ScaledSheet } from 'react-native-size-matters'

import CartProductQuantityComponent from './CartProductQuantityComponent'

class CartProduct extends React.PureComponent {

	onReturnItemSelect = () => {
		this.props.returnItem.onSelect(this.props.data._id)
	}

	render() {
		const {
			data: {
				_id,
				name,
				price,
				paidPrice,
				discountedPrice,
				slug,
				quantity
			},
			previousOrder,
			returnItem
		} = this.props

		const url = `${Config.SERVER_URL}/assets/products/${slug}_300x300.webp`

		return (
			<View style={styles.container}>
				<View style={[styles.child, styles.flex2, styles.imageContainer]}>
					<Image
						style={styles.productImage}
						resizeMode='contain'
						resizeMethod='resize'
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
						{
							returnItem ? (
								<Text style={styles.productPrice}>{`₺${paidPrice.toFixed(2).toString().replace('.', ',')}`}</Text>
							) : (
									<>
										<Text style={[styles.productPrice, (discountedPrice && !previousOrder) ? styles.discountedPrice : {}]}>{`₺${price.toFixed(2).toString().replace('.', ',')}`}</Text>
										{
											(discountedPrice && !previousOrder) && (
												<Text style={styles.productPrice}>{`₺${discountedPrice.toFixed(2).toString().replace('.', ',')}`}</Text>
											)
										}
									</>
								)
						}
					</View>
					<View style={styles.rowChild}>
						<View style={styles.child} />

						<CartProductQuantityComponent
							_id={_id}
							previousOrder={previousOrder}
							returnItem={returnItem}
							quantity={quantity} />

						<View style={styles.child} />
					</View>
				</View >
			</View >
		)
	}
}

const styles = ScaledSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		padding: '4@s',
		paddingVertical: '12@s',
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
		paddingHorizontal: '8@s',
		justifyContent: 'center',
		alignItems: 'center'
	},
	priceContainer: {
		flexDirection: 'row'
	},
	productName: {
		fontSize: '15@s',
		fontWeight: '700',
		color: '#454545',
		textAlign: 'center',
		justifyContent: 'center'
	},
	productPrice: {
		fontSize: '18@s',
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
		padding: '4@s',
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