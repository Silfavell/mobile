import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'

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
		if (this.state.orders.length > 0) {
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

		return (
			<View style={styles.container}>
				<Ionicons name='ios-copy' size={96} color='#BDBDBD' />
				<Text style={styles.emptyText}>Siparişiniz bulunmamaktadır.</Text>
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

export default PreviousOrdersScreen
