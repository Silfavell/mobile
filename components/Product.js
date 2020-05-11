import React from 'react'
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize'
import {
	TouchableOpacity, View, Text, Image, StyleSheet,
} from 'react-native'

import { connect } from 'react-redux'
import { SERVER_URL } from '../utils/global'

import { increaseProductQuantity } from '../actions/actions1'

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
			name, price, category, image
		} = this.props.data

		const url = `${SERVER_URL}/assets/products-2/${category}/${image}.webp`

		return (
			<View style={styles.container}>

				<TouchableOpacity
					onPress={this.onAddProductClick}
					style={styles.addProductButton}
				>
					<Text style={styles.addProductIcon}>+</Text>
				</TouchableOpacity>

				<TouchableOpacity style={[styles.child, styles.productImageContainer]} onPress={this.onProductClick}>
					<Image source={{ uri: url }} resizeMode="contain" style={styles.productImage} />
				</TouchableOpacity>

				<Text style={[styles.child, styles.productPrice, { alignItems: 'flex-start' }]}>{`₺${price.toFixed(2).toString().replace('.', ',')}`}</Text>

				<Text numberOfLines={3} style={[styles.productName, styles.child]}>{name}</Text>

				{
					//	<View style={[styles.child, { alignItems: 'flex-start' }]}>
					//		<Text numberOfLines={3} style={styles.kindText}>{kind_name}</Text>
					//	</View>
				}

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
	addProductButton: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: 1,
		right: 1,
		zIndex: 1,
		borderRadius: 8,
		borderWidth: 0.2,
		width: RFValue(34, 600),
		height: RFValue(34, 600),
		borderColor: '#CDCDCD',
		backgroundColor: 'white',
		shadowColor: '#000',
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 12,
		elevation: 4
	},
	addProductIcon: {
		color: '#5837C2',
		fontSize: RFValue(23, 600)
	},
	productImageContainer: {
		borderWidth: 0.2,
		borderColor: '#BCBCBC',
		borderRadius: 16,
		backgroundColor: 'white'
	},
	productImage: {
		width: RFPercentage(12),
		height: RFPercentage(14),
		margin: RFValue(6, 600)
	},
	productName: {
		fontSize: RFPercentage(2.6),
		fontWeight: '600',
		color: 'black',
		textAlign: 'left',
		justifyContent: 'center'
	},
	kindText: {
		fontSize: RFPercentage(2.3),
		fontWeight: '700',
		color: '#B1B1B1',
		textAlign: 'left',
		justifyContent: 'center',
		letterSpacing: 0.2
	},
	productPrice: {
		fontSize: RFPercentage(2.9),
		fontWeight: '700',
		color: '#5837C2',
		textAlign: 'left',
		justifyContent: 'center'
	}
})

const mapDispatchToProps = {
	increaseProductQuantity,
}

export default connect(null, mapDispatchToProps)(Product)
