import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
	ScrollView,
	TouchableOpacity,
	View,
	Text
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { SERVER_URL } from '../../utils/global'
import { increaseProductQuantity } from '../../actions/actions1'
import { addToFavoriteProducts, removeFromFavoriteProdutcs } from '../../actions/actions4'

import ButtonComponent from '../../components/ButtonComponent'
import ShadowContainer from '../../components/ShadowContainer'

import Slider from '../../components/Slider'
import Color from './Color'
import Comment from './Comment'
import Loading from '../../components/LoadingComponent'
import Accordion from '../../components/Accordion'

class FullProductScreen extends React.Component {
	scrollRef = React.createRef()

	state = {
		product: null,
		pickedColor: -1
	}

	componentDidMount() {
		this.getProductBySlug(this.props.route.params.slug)
	}

	// eslint-disable-next-line camelcase
	UNSAFE_componentWillReceiveProps() {
		if (this.state.pickedColor === -1) {
			this.setHeader(this.state.product._id)
		} else {
			this.setHeader(this.state.product.group[this.state.pickedColor]._id)
		}
	}

	onHeartClick = (_id) => {
		if (this.props.user?.favoriteProducts?.includes(_id)) {
			this.removeFromFavoriteProdutcs(_id, this.props.messagePopupRef)
		} else {
			this.addToFavoriteProducts(_id, this.props.messagePopupRef)
		}
	}

	setHeader = (_id) => {
		if (this.props.token) {
			this.props.navigation.setOptions({
				headerRight: () => (
					<TouchableOpacity onPress={() => this.onHeartClick(_id)}>
						<Ionicons
							size={26}
							color="rgba(0,0,0,.8)"
							style={{ marginRight: 18 }}
							name={this.props.user?.favoriteProducts?.includes(_id) ? 'md-heart' : 'md-heart-empty'}
						/>

					</TouchableOpacity>
				)
			})
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
		this.props.addToFavoriteProducts(_id, this.props.messagePopupRef)
	}

	removeFromFavoriteProdutcs = (_id) => {
		this.props.removeFromFavoriteProdutcs(_id, this.props.messagePopupRef)
	}

	getProductBySlug = (productSlug) => {
		axios.get(`${SERVER_URL}/product/${productSlug}?fromSearch=${!!this.props.route.params.fromSearch}`).then(({
			data,
			status
		}) => {
			if (status === 200) {
				this.setState({
					product: data,
					pickedColor: -1
				}, () => {
					this.scrollRef.current.scrollTo({ y: 0, animated: true })
					this.setHeader(data._id)
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

		return Array.from(new Array(imageCount)).map((el, index) => `${SERVER_URL}/assets/products/${image}-${index}.webp`)
	}

	isColorSelected = (index) => {
		if (this.state.pickedColor === -1) {
			const productIndexInGroup = this.state.product.group.find((product) => product._id === this.state.product._id)
			return this.state.product.group.indexOf(productIndexInGroup) === index
		}

		return index === this.state.pickedColor
	}

	renderExtraDetailsRow = ({ title, value, first }) => (
		<View style={[
			styles.detailRow,
			!first ? styles.nonFirstDetailsRow : {}
		]}
		>
			<View style={styles.detailRowTitleContainer}>
				<Text style={styles.detailRowTitle}>{title}</Text>
			</View>
			<View style={styles.detailRowValueContainer}>
				<Text style={styles.detailRowValue}>{value}</Text>
			</View>
		</View>
	)

	render() {
		if (this.state.product) {
			const {
				name,
				details,
				price,
				discountedPrice,
				color,
				specifications,
				comments
			} = this.state.pickedColor === -1 ? this.state.product : this.state.product.group[this.state.pickedColor]

			return (
				<View style={styles.container}>

					<ScrollView
						ref={this.scrollRef}
						contentContainerStyle={styles.scrollContainer}
						onScroll={this.handleScroll}
					>
						<ShadowContainer style={{ backgroundColor: 'white' }}>
							<View style={styles.imageContainer}>
								<Slider
									imageContainerStyle={{ paddingBottom: 20 }}
									_id={`Slider:${(this.state.pickedColor === -1 ? this.state.product : this.state.product.group[this.state.pickedColor])._id}`}
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
							(this.state.product.group && this.state.product.group.length > 1 && color) && (
								<View style={styles.colorContainer}>
									<View style={styles.textContainer}>
										<Text style={styles.colorText}>
											{'Renk:    '}
											<Text style={styles.colorName}>{color.name}</Text>
										</Text>
									</View>

									<View style={styles.colors}>

										{
											this.state.product.group.map((groupProduct, index) => (
												<Color
													product={groupProduct}
													selected={this.isColorSelected(index)}
													index={index}
													onPress={this.onColorPicked}
												/>
											))
										}

									</View>
								</View>
							)
						}

						<Accordion title="Ürün Hakkında" expanded>
							<>
								<View style={styles.details2}>
									<Text style={styles.productDetail}>{details ?? 'Ürün detayı bulunmamaktadır'}</Text>
								</View>

								<View style={styles.extraDetailsContainer}>
									{
										specifications.map((specification, index) => (
											this.renderExtraDetailsRow({ title: specification.name, value: specification.value, first: index === 0 })
										))
									}
								</View>
							</>
						</Accordion>

						<Accordion title={`Yorumlar (${comments.length})`}>
							<>
								{
									comments.map((comment) => (
										<Comment item={comment} />
									))
								}
							</>
						</Accordion>

						<View style={styles.emptyFooter} />
					</ScrollView>

					<View style={styles.buttonContainer}>
						<ButtonComponent text="Sepete Ekle" onClick={this.onAddToCartClick} />
					</View>
				</View>
			)
		}
		return <Loading />
	}
}

const styles = ScaledSheet.create({
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
		height: '260@s'
	},
	colors: {
		flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'row',
		marginTop: '20@s'
	},
	colorContainer: {
		flex: 1,
		flexDirection: 'column',
		paddingVertical: '20@s',
		marginHorizontal: '10@s',
		borderBottomWidth: 1,
		borderBottomColor: '#EFEFEF'
	},
	details: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: '20@s',
		marginHorizontal: '10@s',
		borderBottomWidth: 1,
		borderBottomColor: '#EFEFEF'
	},
	details2: {
		flex: 1,
		flexDirection: 'column',
		marginTop: '20@s',
		marginHorizontal: '10@s'
	},
	extraDetailsContainer: {
		flex: 1,
		flexDirection: 'column',
		marginTop: '20@s',
		marginHorizontal: '10@s',
		borderWidth: 1,
		borderColor: '#EFEFEF'
	},
	detailRow: {
		display: 'flex',
		flexDirection: 'row'
	},
	nonFirstDetailsRow: {
		borderTopWidth: 1,
		borderTopColor: '#EFEFEF'
	},
	detailRowTitleContainer: {
		flex: 4,
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: '#F7F7F7'
	},
	detailRowTitle: {
		padding: '12@s',
		fontSize: '15@s'
	},
	detailRowValueContainer: {
		flex: 8,
		display: 'flex',
		justifyContent: 'center',
		borderLeftWidth: 1,
		borderLeftColor: '#EFEFEF'
	},
	detailRowValue: {
		padding: '12@s',
		fontSize: '15@s'
	},
	productDetailText: {
		margin: '4@s',
		fontSize: '18@s',
		fontWeight: 'bold'
	},
	productDetail: {
		margin: '4@s',
		fontSize: '15@s'
	},
	price: {
		fontSize: '17@s',
		marginRight: '8@s',
		fontWeight: '700',
		color: 'rgba(0,0,0,.8)'
	},
	discountedPrice: {
		fontWeight: 'normal',
		// fontWeight: '100',
		textDecorationLine: 'line-through'
	},
	productName: {
		fontSize: '16@s',
		fontWeight: 'bold'
	},
	colorText: {
		fontSize: '16@s',
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
		margin: '4@s'
	},
	priceContainer: {
		margin: '4@s',
		paddingHorizontal: '8@s',
		flexDirection: 'column',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	emptyFooter: { height: '100@s' }
})

const mapStateToProps = ({
	sourceReducer: {
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
