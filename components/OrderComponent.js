import React from 'react'
import { View, Text } from 'react-native'

import CartProduct from './CartProduct'

class OrderComponent extends React.PureComponent {
	render() {
		const { item } = this.props

		const totalPrice = item.products.reduce((previousValue, currentValue) => previousValue + parseFloat(currentValue.price) * currentValue.quantity, 0).toFixed(2)

		return (
			<View style={{
				flex: 1,
				height: 'auto',
				marginHorizontal: 6,
				marginVertical: 12,
				padding: 6,
				borderRadius: 8,
				display: 'flex',
				borderWidth: 1,
				borderColor: '#CDCDCD',
				backgroundColor: 'white'
			}}
			>
				<View style={{
					borderBottomWidth: 1,
					borderBottomColor: '#CDCDCD'
				}}
				>
					<View style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						padding: 4
					}}
					>
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

					<View style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						padding: 4
					}}
					>
						<Text>Ödenen Tutar:</Text>
						<Text>{`₺${totalPrice}`}</Text>
					</View>
				</View>

				<View style={{
					display: 'flex'
				}}
				>
					{
						item.products.map((product) => (
							<CartProduct data={product} previousOrder />
						))
					}
				</View>
			</View>
		)
	}
}

export default OrderComponent
