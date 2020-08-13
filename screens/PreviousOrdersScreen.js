import React from 'react'
import { View, Text, FlatList } from 'react-native'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScaledSheet } from 'react-native-size-matters'

import { SERVER_URL } from '../utils/global'
import OrderComponent from '../components/OrderComponent'
import LoadingComponent from '../components/LoadingComponent'

class PreviousOrdersScreen extends React.PureComponent {
	state = {
		orders: [],
		fetching: true
	}

	UNSAFE_componentWillMount() {
		const url = `${SERVER_URL}/user/orders`

		axios.get(url).then(({ status, data }) => {
			if (status === 200) {
				this.setState({ orders: data, fetching: false })
			} else {
				this.setState({ fetching: false })
			}
		}).catch(() => {
			this.setState({ fetching: false })
		})
	}

	keyExtractor = (item) => item._id

	render() {
		if (this.state.fetching) {
			return <LoadingComponent />
		} else if (this.state.orders.length > 0) {
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
				<Text style={styles.emptyText}>Siparişiniz bulunmamaktadır</Text>
			</View>
		)
	}
}

const styles = ScaledSheet.create({
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

export default PreviousOrdersScreen
