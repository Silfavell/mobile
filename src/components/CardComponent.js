import React from 'react'
import { connect } from 'react-redux'
import {
	View,
	TouchableOpacity,
	Text,
	Image
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScaledSheet } from 'react-native-size-matters'

import { setSelectedCard } from '../actions/payment-actions'

import mastercard from '../../assets/mastercard.png'
import visa from '../../assets/visa.png'

const getCardIcon = (type) => {
	switch (type) {
		case 'MASTER_CARD': return mastercard
		default: return visa
	}
}

class CardComponent extends React.PureComponent {
	onClick = () => {
		const {
			// eslint-disable-next-line no-shadow
			item, navigation, setSelectedCard
		} = this.props

		setSelectedCard(item.cardToken, () => {
			navigation.goBack()
		})
	}

	onDeleteClick = () => {
		const { item, setPopupState } = this.props
		setPopupState({ scaleAnimationModal: true, selectedCard: item.cardToken })
	}

	render() {
		const { item } = this.props

		return (
			<View style={styles.container}>
				<TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={this.onClick}>
					<View style={styles.child}>
						<Image
							style={styles.cardImage}
							resizeMode='contain'
							resizeMethod='resize'
							source={getCardIcon(item.cardAssociation)} />
					</View>
					<View style={[styles.child, styles.textContainer]}>
						<View style={styles.child}>
							<Text style={styles.cardName}>{item.cardAlias}</Text>
						</View>
						<View style={styles.child}>
							<Text style={styles.cardNumber}>{`•••• •••• •••• ${item.lastFourDigits}`}</Text>
						</View>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.child} onPress={this.onDeleteClick}>
					<Ionicons name='md-trash' size={32} color='rgba(0,0,0,.8)' />
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = ScaledSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		padding: 8,
		marginHorizontal: 6,
		borderBottomWidth: 0.4,
		borderBottomColor: '#CDCDCD'
	},
	child: {
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 8
	},
	cardName: {
		fontSize: '16@s'
	},
	cardNumber: {
		fontSize: '15@s',
		color: '#6C7486'
	},
	highlightedText: {
		fontSize: '16@s',
		color: 'rgba(0,0,0,.8)'
	},
	cardImage: {
		height: 24,
		width: 36
	},
	textContainer: {
		flex: 1,
		alignItems: 'flex-start',
		marginHorizontal: 6
	}
})

const mapDispatchToProps = {
	setSelectedCard
}

export default connect(null, mapDispatchToProps)(CardComponent)
