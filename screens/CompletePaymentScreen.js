import React from 'react'
import { connect } from 'react-redux'

import HeadingDivider from '../components/HeadingDivider'
import CompletePayment from '../components/CompletePayment'

import AddressSelectComponent from '../components/CompletePaymentComponents/AddressSelectComponent'
import PaymentTypeSelectComponent from '../components/CompletePaymentComponents/PaymentTypeSelectComponent'
import ShadowContainer from '../components/ShadowContainer'

import { setNeedToLoginPopupState } from '../actions/global-actions'

class CompletePaymentScreen extends React.PureComponent {
	render() {
		const {
			navigation,
			cards,
			addresses,
			selectedCard,
			selectedAddress,
			token,
			// eslint-disable-next-line no-shadow
			setNeedToLoginPopupState
		} = this.props

		return (
			<>
				<ShadowContainer>
					<HeadingDivider title='Adres Seçimi' />

					<AddressSelectComponent
						navigation={navigation}
						token={token}
						setNeedToLoginPopupState={setNeedToLoginPopupState}
						title={(addresses.find((address) => address._id === selectedAddress))?.openAddress ?? 'Adres Seçiniz'}
						subTitle={(addresses.find((address) => address._id === selectedAddress))?.openAddress ?? 'Adres Seçiniz'}
					/>

					<HeadingDivider title='Ödeme Şekli' />

					<PaymentTypeSelectComponent
						navigation={navigation}
						token={token}
						setNeedToLoginPopupState={setNeedToLoginPopupState}
						title={(cards.find((card) => card.cardToken === selectedCard))?.cardAlias ?? 'Kart Seçiniz'}
						subTitle={(cards.find((card) => card.cardToken === selectedCard))?.cardNumber ?? 'Kart Seçiniz'}
					/>

				</ShadowContainer>

				<CompletePayment
					completable
					navigation={navigation}
				/>
			</>
		)
	}
}

const mapStateToProps = ({
	reducer2: {
		cards,
		addresses,
		selectedCard,
		selectedAddress
	},
	reducer4: {
		token
	}
}) => ({
	cards,
	addresses,
	selectedCard,
	selectedAddress,
	token
})

const mapDispatchToProps = {
	setNeedToLoginPopupState
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletePaymentScreen)
