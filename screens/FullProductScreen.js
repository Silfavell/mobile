import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
	ScrollView,
	TouchableOpacity,
	View,
	Text,
	StyleSheet
} from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

import { SERVER_URL } from '../utils/global'
import { increaseProductQuantity } from '../actions/actions1'
import { addToFavoriteProducts, removeFromFavoriteProdutcs } from '../actions/actions4'

import ButtonComponent from '../components/ButtonComponent'
import ShadowContainer from '../components/ShadowContainer'

import Slider from '../components/Slider'
import Color from '../components/fullProdutScreen/Color'
import Loading from '../components/LoadingComponent'

class FullProductScreen extends React.PureComponent {

	scrollRef = React.createRef()

	constructor(props) {
		super(props)
		this.getProductById(this.props.route.params)
		this.setHeader(this.props.route.params)
	}

	state = {
		product: null,
		pickedColor: -1
	}

	onHeartClick = (_id) => {
		this.props.user?.favoriteProducts.includes(_id) ? this.removeFromFavoriteProdutcs(_id, this.props.messagePopupRef) : this.addToFavoriteProducts(_id, this.props.messagePopupRef)
	}

	setHeader = (_id) => {
		this.props.navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={() => this.onHeartClick(_id)}>
					<Ionicons
						size={26}
						color={'rgba(0,0,0,.8)'}
						style={{ marginRight: 18 }}
						name={this.props.user?.favoriteProducts.includes(_id) ? 'md-heart' : 'md-heart-empty'} />

				</TouchableOpacity>
			)
		})
	}

	UNSAFE_componentWillReceiveProps() {
		if (this.state.pickedColor === -1) {
			this.setHeader(this.state.product._id)
		} else {
			this.setHeader(this.state.product.group[this.state.pickedColor]._id)
		}
	}

	onAddToCartClick = () => {
		if (this.state.pickedColor === -1) {
			this.props.increaseProductQuantity(this.state.product._id, this.props.messagePopupRef)
		} else {
			this.props.increaseProductQuantity(this.state.product.group[this.state.pickedColor]._id, this.props.messagePopupRef)
		}
	}

	addToFavoriteProducts = (_id) => {
		if (this.props.token) {
			this.props.addToFavoriteProducts(_id, this.props.messagePopupRef)
		} else {
			this.props.navigation.navigate('Welcome', { screen: 'login' })
		}
	}

	removeFromFavoriteProdutcs = (_id) => {
		if (this.props.token) {
			this.props.removeFromFavoriteProdutcs(_id, this.props.messagePopupRef)
		} else {
			this.props.navigation.navigate('Welcome', { screen: 'login' })
		}
	}

	getProductById = (productId) => {
		axios.get(`${SERVER_URL}/product/${productId}`).then(({
			data,
			status
		}) => {
			if (status === 200) {
				this.setState({
					product: data,
					pickedColor: -1
				}, () => {
					this.scrollRef.current.scrollTo({ y: 0, animated: true })
				})
			}
		})
	}

	onColorPicked = (colorIndex) => {
		this.setState({ pickedColor: colorIndex }, () => {
			this.setHeader(this.state.product.group[colorIndex]._id)
		})
	}

	getImages = () => {
		const {
			image,
			imageCount
		} = this.state.pickedColor === -1 ? this.state.product : this.state.product.group[this.state.pickedColor]

		return Array.from(new Array(imageCount)).map((el, index) => {
			return `${SERVER_URL}/assets/products/${image}-${index}.webp`
		})
	}

	isColorSelected = (index) => {
		if (this.state.pickedColor === -1) {
			const productIndexInGroup = this.state.product.group.find((product) => product._id === this.state.product._id)
			return this.state.product.group.indexOf(productIndexInGroup) === index
		}

		return index === this.state.pickedColor
	}

	render() {
		if (this.state.product) {
			const {
				name,
				price,
				discountedPrice,
				color
			} = this.state.pickedColor === -1 ? this.state.product : this.state.product.group[this.state.pickedColor]

			return (
				<View style={styles.container}>

					<ScrollView
						ref={this.scrollRef}
						contentContainerStyle={styles.scrollContainer}
						onScroll={this.handleScroll}>
						<ShadowContainer style={{ backgroundColor: 'white' }}>
							<View style={styles.imageContainer}>
								<Slider
									imageContainerStyle={{ paddingBottom: 20 }}
									_id={'Slider:' + (this.state.pickedColor === -1 ? this.state.product : this.state.product.group[this.state.pickedColor])._id}
									images={this.getImages()}
									shopSingle
									paginator
								/>
							</View>
						</ShadowContainer>
						<View style={styles.details}>
							<View style={styles.textContainer}>
								<Text style={styles.productName}>{name}</Text>
							</View>

							<View style={styles.priceContainer}>
								<Text style={[styles.price, discountedPrice ? styles.discountedPrice : {}]}>{`₺${price.toFixed(2).toString().replace('.', ',')}`}</Text>

								{
									discountedPrice && (
										<Text style={styles.price}>{`₺${discountedPrice.toFixed(2).toString().replace('.', ',')}`}</Text>
									)
								}
							</View>
						</View>

						{
							(this.state.product.group && color) && (
								<View style={styles.colorContainer}>
									<View style={styles.textContainer}>
										<Text style={styles.colorText}>{'Renk:    '}<Text style={styles.colorName}>{color.name}</Text></Text>
									</View>

									<View style={styles.colors}>

										{
											this.state.product.group.map((groupProduct, index) => (
												<Color
													product={groupProduct}
													selected={this.isColorSelected(index)}
													index={index}
													onPress={this.onColorPicked} />
											))
										}

									</View>
								</View>
							)
						}


						<View style={styles.details2}>
							<Text style={styles.productDetailText}>Ürün Hakkında</Text>

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
				</View >
			)
		} else {
			return <Loading />
		}
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		flex: 1,
		backgroundColor: 'white'
	},
	scrollContainer: {
		justifyContent: 'space-between'
	},
	imageContainer: {
		flex: 1,
		height: 260
	},
	colors: {
		flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'row',
		marginTop: 20
	},
	colorContainer: {
		flex: 1,
		flexDirection: 'column',
		paddingVertical: 20,
		marginHorizontal: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#EFEFEF'
	},
	details: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 20,
		marginHorizontal: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#EFEFEF'
	},
	details2: {
		flex: 1,
		flexDirection: 'column',
		marginTop: 20,
		marginHorizontal: 10
	},
	productDetailText: {
		margin: 4,
		fontSize: RFValue(18, 600),
		fontWeight: 'bold'
	},
	productDetail: {
		margin: 4,
		fontSize: RFValue(15, 600)
	},
	price: {
		fontSize: RFPercentage(3.2),
		marginRight: 8,
		fontWeight: '700',
		color: 'rgba(0,0,0,.8)'
	},
	discountedPrice: {
		fontWeight: 'normal',
		fontWeight: '100',
		textDecorationLine: 'line-through'
	},
	productName: {
		fontSize: RFValue(18, 600),
		fontWeight: 'bold'
	},
	colorText: {
		fontSize: RFValue(18, 600),
		fontWeight: 'bold'
	},
	colorName: {
		fontWeight: 'normal'
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
	priceContainer: {
		margin: 4,
		paddingHorizontal: 4,
		flexDirection: 'row',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	emptyFooter: { height: 100 }
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

export default connect(mapStateToProps, mapDispatchToProps)(FullProductScreen)
