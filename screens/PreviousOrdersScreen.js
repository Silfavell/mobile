import React from 'react'
import { View, FlatList } from 'react-native'
import axios from 'axios'

import { SERVER_URL } from '../utils/global'
import OrderComponent from '../components/OrderComponent'

class PreviousOrdersScreen extends React.PureComponent {
	state = {
		orders: []
	}

	// eslint-disable-next-line camelcase
	UNSAFE_componentWillMount() {
		const url = `${SERVER_URL}/user/orders`

		axios.get(url).then(({ status, data }) => {
			if (status === 200) {
				this.setState({ orders: data })
			}
		})
	}

	keyExtractor = (item) => item._id

	render() {
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={this.state.orders}
					keyExtractor={this.keyExtractor}
					renderItem={({ item }) => <OrderComponent item={item} />}
				/>
			</View>
		)
	}
}

export default PreviousOrdersScreen
