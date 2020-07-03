import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Linking } from 'react-native'

import CartProduct from './CartProduct'
import SettingItem from './SettingItem'

class OrderComponent extends React.PureComponent {

	getStatusText = (status) => {
		switch (status) {
			case true: return 'Onaylandı'
			case false: return 'Iptal Edildi'
			default: return 'Onay Bekliyor'
		}
	}

	onCargoTrackClick = () => {
		const trakingCode = 507080886413
		Linking.openURL(`http://kargotakip.araskargo.com.tr/mainpage.aspx?code=${trakingCode}`)
	}

	render() {
		const { item } = this.props

		const totalPrice = item.products.reduce((previousValue, currentValue) => previousValue + parseFloat(currentValue.price) * currentValue.quantity, 0).toFixed(2)
		console.log(item)
		return (
			<View style={styles.container}>
				<View style={styles.detailsContainer}>
					<View style={styles.detailContainer}>
						<Text>Sipariş Tarihi:</Text>
						<Text>
							{
								new Date(item.date).toLocaleDateString('tr-TR', {
									weekday: 'long',
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})
							}
						</Text>
					</View>

					<View style={styles.detailContainer}>
						<Text>Ödenen Tutar:</Text>
						<Text>{`₺${totalPrice.replace('.', ',')}`}</Text>
					</View>

					<View style={styles.detailContainer}>
						<Text>Sipariş Durumu:</Text>
						<Text>{this.getStatusText(item.status)}</Text>
					</View>

				</View>

				<View style={styles.productContainer}>
					{
						item.products.map((product, index) => (
							<CartProduct data={product} previousOrder />
						))
					}
				</View>

				{
					item.status && (
						<TouchableOpacity activeOpacity={0.6} onPress={this.onCargoTrackClick}>
							<SettingItem title={'Kargo Takip'} order />
						</TouchableOpacity>
					)
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: 'auto',
		marginHorizontal: 6,
		marginVertical: 12,
		padding: 6,
		display: 'flex',
		borderWidth: 1,
		borderColor: '#DFDFDF',
		backgroundColor: 'white'
	},
	detailsContainer: {
		paddingBottom: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#DFDFDF'
	},
	detailContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 4
	},
	productContainer: {
		display: 'flex'
	}
})

export default OrderComponent
