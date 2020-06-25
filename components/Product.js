import React from 'react'
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize'
import {
	TouchableOpacity,
	View,
	Text,
	Image,
	StyleSheet
} from 'react-native'

import { connect } from 'react-redux'
import { SERVER_URL } from '../utils/global'

import { increaseProductQuantity } from '../actions/actions1'

import productEx from '../assets/product.jpg'

class Product extends React.PureComponent {
	onAddProductClick = () => {
		// eslint-disable-next-line no-shadow
		const { data: { _id }, increaseProductQuantity } = this.props
		increaseProductQuantity(_id)
	}

	onProductClick = () => {
		this.props.navigation.navigate('fullProductScreen', this.props.data)
	}

	render() {
		const {
			name,
			price,
			categoryId,
			image
		} = this.props.data

		const url = `${SERVER_URL}/assets/products-2/${categoryId}/${image}.webp`

		return (
			<View style={styles.container}
			//	onLayout={(event) => {
			//		var { x, y, width, height } = event.nativeEvent.layout;
			//		console.log(height)
			//	}}
			>

				<TouchableOpacity style={[styles.child, styles.productImageContainer]} onPress={this.onProductClick}>
					<Image
						// source={{ uri: url }}
						source={productEx}
						resizeMode='contain'
						style={styles.productImage}
					/>
				</TouchableOpacity>

				<Text style={[styles.child, styles.productPrice, { alignItems: 'flex-start' }]}>{`₺${price.toFixed(2).toString().replace('.', ',')}`}</Text>

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
		backgroundColor: 'transparent'
	},
	child: {
		alignItems: 'center',
		justifyContent: 'center',
		margin: 6,
		marginVertical: RFPercentage(0.3)
	},
	productImageContainer: {
		backgroundColor: 'white'
	},
	productImage: {
		borderWidth: 1,
		borderColor: '#EFEFEF',
		width: '100%',
		height: null,
		aspectRatio: 0.6,
		paddingBottom: RFValue(6, 600)
	},
	productName: {
		fontSize: RFPercentage(2.6),
		fontWeight: '600',
		color: 'black',
		textAlign: 'left',
		justifyContent: 'center'
	},
	productPrice: {
		fontSize: RFPercentage(2.9),
		fontWeight: '700',
		color: '#DB0099',
		textAlign: 'left',
		justifyContent: 'center'
	}
})

const mapDispatchToProps = {
	increaseProductQuantity
}

export default connect(null, mapDispatchToProps)(Product)
