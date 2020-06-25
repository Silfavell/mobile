import React from 'react'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
	ScrollView,
	TouchableOpacity,
	View,
	Image,
	Text,
	StyleSheet
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { SERVER_URL } from '../utils/global'
import { increaseProductQuantity } from '../actions/actions1'
import ButtonComponent from '../components/ButtonComponent'

import productEx from '../assets/product.jpg'

class FullProductScreen extends React.PureComponent {
	// eslint-disable-next-line no-useless-constructor
	constructor(props) {
		super(props)

		/*
			this.props.navigation.setOptions({
				headerRight: () => (
					<TouchableOpacity onPress={() => {
						console.log(this.props.route.params._id)
					}}
					>
						<Ionicons size={26} color='white' style={{ marginRight: 16 }} name='md-heart' />
					</TouchableOpacity>
				)
			})
		*/
	}

	onAddToCartClick = () => {
		this.props.increaseProductQuantity(this.props.route.params._id)
	}

	render() {
		const {
			name,
			price,
			categoryId,
			image
		} = this.props.route.params

		// const url = `${SERVER_URL}/assets/original-products/${categoryId}/${image}.png` // TODO
		const url = `${SERVER_URL}/assets/products-2/${categoryId}/${image}.webp`

		return (
			<View style={styles.container}>

				<ScrollView contentContainerStyle={styles.scrollContainer}>
					<View style={styles.imageContainer}>
						<Image
							style={styles.image}
							resizeMode='contain'
							// source={{ uri: url }}
							source={productEx}
						/>
					</View>
					<View style={styles.details}>

						<View style={styles.textContainer}>
							<Text style={styles.price}>{`₺${price.toFixed(2).toString().replace('.', ',')}`}</Text>
						</View>

						<View style={styles.textContainer}>
							<Text style={styles.productName}>{name}</Text>
						</View>

					</View>
				</ScrollView>

				<View style={styles.buttonContainer}>
					<ButtonComponent text='Sepete Ekle' onClick={this.onAddToCartClick} />
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		flex: 1,
		backgroundColor: 'white',
		paddingVertical: 24
	},
	scrollContainer: {
		justifyContent: 'space-between'
	},
	imageContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	image: {
		height: 300,
		marginBottom: 30
	},
	details: {
		flex: 1,
		flexDirection: 'column',
		paddingBottom: 70,
		marginHorizontal: 20
	},
	price: {
		fontSize: RFValue(26, 600),
		fontWeight: '700',
		color: '#DB0099'
	},
	productName: {
		fontSize: RFValue(22, 600),
		textAlign: 'center'
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		backgroundColor: 'white'
	},
	textContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		textAlign: 'center',
		margin: 4
	}
})

const mapDispatchToProps = {
	increaseProductQuantity
}

export default connect(null, mapDispatchToProps)(FullProductScreen)
