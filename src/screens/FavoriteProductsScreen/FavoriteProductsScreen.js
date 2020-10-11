import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScaledSheet } from 'react-native-size-matters'
import Config from 'react-native-config'

import RecyclerList from '../../components/RecyclerList'
import LoadingComponent from '../../components/LoadingComponent'

class FavoriteProductsScreen extends React.Component {
	state = {
		products: [],
		fetching: true
	}

	componentDidMount() {
		this.getFavoriteProducts().then((state) => {
			this.setState(state)
		})
	}

	shouldComponentUpdate(_, nextState) {
		if (nextState.products.length !== this.state.products.length || nextState.fetching !== this.state.fetching) {
			return true
		}

		return false
	}

	//	UNSAFE_componentWillReceiveProps() {
	//		this.getFavoriteProducts()
	//	}

	getFavoriteProducts = () => {
		const url = `${Config.SERVER_URL}/user/favorite-products`

		return axios.get(url).then(({ status, data }) => {
			if (status === 200) {
				return ({
					products: data?.favoriteProducts || [],
					fetching: false
				})
			}
			return ({ fetching: false })
		}).catch(() => ({ fetching: false }))
	}

	render() {
		if (this.state.fetching) {
			return <LoadingComponent />
		} if (this.state.products.length > 0) {
			return (
				<View key={`favoriteProducts:${this.state.products.length}`} style={styles.listContainer}>
					<RecyclerList
						list={this.state.products}
						navigation={this.props.navigation}
					/>
				</View>
			)
		}
		return (
			<View style={styles.container}>
				<Ionicons name='md-heart' size={96} color='#BDBDBD' />
				<Text style={styles.emptyText}>Favori ürününüz bulunmamaktadır</Text>
			</View>
		)
	}
}

const styles = ScaledSheet.create({
	listContainer: {
		flex: 1,
		backgroundColor: 'white'
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#EDEDED'
	},
	emptyText: {
		marginTop: 32,
		fontSize: '18@s',
		textAlign: 'center',
		color: '#454545'
	}
})

const mapStateToProps = ({
	sourceReducer: {
		user: {
			favoriteProducts
		}
	}
}) => ({
	favoriteProducts
})

export default connect(mapStateToProps)(FavoriteProductsScreen)
