import React from 'react'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
	ScrollView,
	TouchableOpacity,
	View,
	Text,
	StyleSheet
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { SERVER_URL } from '../utils/global'
import { increaseProductQuantity } from '../actions/actions1'
import { addToFavoriteProducts, removeFromFavoriteProdutcs } from '../actions/actions4'

import ButtonComponent from '../components/ButtonComponent'
import ShadowContainer from '../components/ShadowContainer'

import productEx from '../assets/product.jpg'
import Slider from '../components/Slider'

class FullProductScreen extends React.PureComponent {
	constructor(props) {
		super(props)
		this.setHeader()
	}

	setHeader = () => {
		this.props.navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={this.props.user?.favoriteProducts.includes(this.props.route.params._id) ? this.removeFromFavoriteProdutcs : this.addToFavoriteProducts}>
					<Ionicons
						size={26}
						color={'rgba(0,0,0,.8)'}
						style={{ marginRight: 18 }}
						name={this.props.user?.favoriteProducts.includes(this.props.route.params._id) ? 'md-heart' : 'md-heart-empty'} />

				</TouchableOpacity>
			)
		})
	}

	UNSAFE_componentWillReceiveProps() {
		this.setHeader()
	}

	onAddToCartClick = () => {
		this.props.increaseProductQuantity(this.props.route.params._id)
	}

	addToFavoriteProducts = () => {
		if (this.props.token) {
			this.props.addToFavoriteProducts(this.props.route.params._id)
		} else {
			this.props.navigation.navigate('Welcome', { screen: 'login' })
		}
	}

	removeFromFavoriteProdutcs = () => {
		if (this.props.token) {
			this.props.removeFromFavoriteProdutcs(this.props.route.params._id)
		} else {
			this.props.navigation.navigate('Welcome', { screen: 'login' })
		}
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
					<ShadowContainer
						style={{ backgroundColor: 'white' }}
					>
						<View style={styles.imageContainer}>
							<Slider
								images={[
									'https://www.gratis.com/ccstore/v1/images/?source=/file/v4629752816058149622/products/10167208_01.jpg&height=940&width=940',
									'https://www.gratis.com/ccstore/v1/images/?source=/file/v2764064473853119068/products/10167209_01.jpg&height=940&width=940',
									'https://www.gratis.com/ccstore/v1/images/?source=/file/v2938411743493834306/products/10204718_01.jpg&height=940&width=940'
								]}
							/>
						</View>
					</ShadowContainer>
					<View style={styles.details}>

						<View style={styles.textContainer}>
							<Text style={styles.price}>{`₺${price.toFixed(2).toString().replace('.', ',')}`}</Text>
						</View>

						<View style={styles.textContainer}>
							<Text style={styles.productName}>{name}</Text>
						</View>

					</View>

					<View style={styles.details}>
						<Text style={styles.productDetail}>{`
• Keçi sütlü formülü ve yoğun proteinli yapısı ile dudaklarıınız MATTE LIPS ile daha nemli bir görünüme kavuşacaktır.

• Dudaklarınızda uzun süreli ,doğal mat etki sağlar. Kremsi yapısı ile örtücülüğü mükemmeldir.

• Keçi sütü ve E Vitamini dudaklarınız gün boyu nemlendirilecektir.

• Paraben içermez.

• Dermatolojik olarak test edilmiştir.

• Gün boyu güzelliğinizle büyülerken cildiniz beslensin!
`
						}</Text>
					</View>

					<View style={styles.emptyFooter} />
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
		height: RFValue(260, 600),
		marginVertical: RFValue(30, 600)
	},
	details: {
		flex: 1,
		flexDirection: 'column',
		marginTop: 20,
		marginHorizontal: 20
	},
	productDetail: {
		margin: 4,
		fontSize: 16
	},
	price: {
		fontSize: RFValue(26, 600),
		fontWeight: '700',
		color: 'rgba(0,0,0,.8)'
	},
	productName: {
		fontSize: RFValue(22, 600)
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		backgroundColor: 'white'
	},
	textContainer: {
		flex: 1,
		justifyContent: 'center',
		display: 'flex',
		textAlign: 'center',
		margin: 4
	},
	emptyFooter: { height: 100 }
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

export default connect(mapStateToProps, mapDispatchToProps)(FullProductScreen)
