import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'

import { SERVER_URL } from '../utils/global'

import RecyclerList from '../components/RecyclerList'

class FavoriteProductsScreen extends React.Component {
	state = {
		products: []
	}

	getFavoriteProducts = () => {
		const url = `${SERVER_URL}/user/favorite-products`

		axios.get(url).then(({ status, data }) => {
			if (status === 200) {
				this.setState({ products: data.favoriteProducts || [] })
			}
		})
	}

	// eslint-disable-next-line camelcase
	UNSAFE_componentWillMount() {
		this.getFavoriteProducts()
	}

	componentWillReceiveProps() {
		this.getFavoriteProducts()
	}

	render() {
		if (this.state.products.length > 0) {
			return (
				<RecyclerList
					list={this.state.products}
					navigation={this.props.navigation}
					favoriteProducts
				/>
			)
		}

		return (
			<View style={styles.container}>
				<Ionicons name='md-heart' size={96} color='#BDBDBD' />
				<Text style={styles.emptyText}>Favori ürününüz bulunmamaktadır.</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#EDEDED'
	},
	emptyText: {
		marginTop: 32,
		fontSize: RFValue(18, 600),
		textAlign: 'center',
		color: '#454545'
	}
})

const mapStateToProps = ({
	reducer4: {
		user
	}
}) => ({
	user
})

export default connect(mapStateToProps)(FavoriteProductsScreen)
