import React from 'react'

import { connect } from 'react-redux'

import { setNeedToLoginPopupState } from '../../actions/global-actions'
import CompletePayment from '../../components/CompletePayment'
import HeadingDivider from '../../components/HeadingDivider'
import ShadowContainer from '../../components/ShadowContainer'
import AddressSelectComponent from './AddressSelectComponent'
import CargoPriceComponent from './CargoPriceComponent'
import PaymentTypeSelectComponent from './PaymentTypeSelectComponent'


class CompletePaymentScreen extends React.PureComponent {
    render() {
        const {
            navigation,
            cards,
            addresses,
            selectedCard,
            selectedAddress,
            token,
            setNeedToLoginPopupState
        } = this.props

        return (
            <>
                <ShadowContainer>
                    <HeadingDivider title="Adres Seçimi" />

                    <AddressSelectComponent
                        navigation={navigation}
                        token={token}
                        setNeedToLoginPopupState={setNeedToLoginPopupState}
                        title={
              addresses.find((address) => address._id === selectedAddress)?.openAddress ??
              'Adres Seçiniz'
                        }
                        subTitle={
              addresses.find((address) => address._id === selectedAddress)?.openAddress ??
              'Adres Seçiniz'
                        }
                    />

                    <HeadingDivider title="Ödeme Şekli" />

                    <PaymentTypeSelectComponent
                        navigation={navigation}
                        token={token}
                        setNeedToLoginPopupState={setNeedToLoginPopupState}
                        title={
              cards.find((card) => card.cardToken === selectedCard)?.cardAlias ?? 'Kart Seçiniz'
                        }
                        subTitle={
              cards.find((card) => card.cardToken === selectedCard)?.cardNumber ?? 'Kart Seçiniz'
                        }
                    />

                    <HeadingDivider title="Kargo Ücreti" />

                    <CargoPriceComponent />
                </ShadowContainer>

                <CompletePayment completable navigation={navigation} />
            </>
        )
    }
}

const mapStateToProps = ({
    paymentReducer: { cards, addresses, selectedCard, selectedAddress },
    sourceReducer: { token }
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
