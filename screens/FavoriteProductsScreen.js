import React from 'react'
import { View } from 'react-native'
import axios from 'axios'

import { SERVER_URL } from '../utils/global'

import RecyclerList from '../components/RecyclerList'

class FavoriteProductsScreen extends React.PureComponent {
	state = {
		products: []
	}

	// eslint-disable-next-line camelcase
	UNSAFE_componentWillMount() {
		const url = `${SERVER_URL}/user/favorite-products`

		axios.get(url).then(({ status, data }) => {
			if (status === 200) {
				this.setState({ products: data.favoriteProducts })
			}
		})
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				{
					this.state.products.length > 0 && (
						<RecyclerList list={this.state.products} navigation={this.props.navigation} />
					)
				}
			</View>
		)
	}
}

export default FavoriteProductsScreen
