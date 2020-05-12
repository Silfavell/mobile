import React from 'react'
import { connect } from 'react-redux'
import {
	ScrollView, View, Image, Text, StyleSheet
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { SERVER_URL } from '../utils/global'
import { increaseProductQuantity } from '../actions/actions1'
import ButtonComponent from '../components/ButtonComponent'

class FullProductScreen extends React.PureComponent {
	onAddToCartClick = () => {
		this.props.increaseProductQuantity(this.props.route.params._id)
	}

	render() {
		const {
			name, price, category, image,
		} = this.props.route.params

		// const url = `${SERVER_URL}/assets/original-products/${category}/${image}.png` // TODO
		const url = `${SERVER_URL}/assets/products-2/${category}/${image}.webp`

		return (
			<View style={styles.container}>

				<ScrollView contentContainerStyle={styles.scrollContainer}>
					<View style={styles.imageContainer}>
						<Image
							style={styles.image}
							resizeMode="contain"
							source={{ uri: url }}
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
					<ButtonComponent text="Sepete Ekle" onClick={this.onAddToCartClick} />
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between', flex: 1, backgroundColor: 'white', paddingVertical: 12
	},
	scrollContainer: { justifyContent: 'space-between' },
	imageContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	image: { width: '80%', aspectRatio: 1 },
	details: { flex: 1, flexDirection: 'column' },
	price: { fontSize: RFValue(26, 600), fontWeight: '700', color: '#DB0099' },
	productName: { fontSize: RFValue(22, 600), textAlign: 'center' },
	buttonContainer: {
		position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'white'
	},
	textContainer: {
		flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex', textAlign: 'center', margin: 4
	}
})

const mapDispatchToProps = {
	increaseProductQuantity,
}

export default connect(null, mapDispatchToProps)(FullProductScreen)
