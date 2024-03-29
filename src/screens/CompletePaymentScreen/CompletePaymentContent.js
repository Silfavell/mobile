import React from 'react'

import { ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { setNeedToLoginPopupState } from '../../actions/global-actions'
import HeadingDivider from '../../components/HeadingDivider/HeadingDivider'
import ShadowContainerHoc from '../../components/ShadowContainerHoc/ShadowContainerHoc'
import AddressSelectComponent from './AddressSelectComponent'
import CargoPriceComponent from './CargoPriceComponent'
import PaymentTypeSelectComponent from './PaymentTypeSelectComponent'

const CompletePaymentContent = ({
    navigation,
    cards,
    addresses,
    selectedCard,
    selectedAddress,
    token,
    setNeedToLoginPopupState
}) => {
    const selectedAddressObj = addresses.find((address) => address._id === selectedAddress)
    const selectedCardObj = cards.find((card) => card.cardToken === selectedCard)

    return (

        <ScrollView style={styles.container}>

            <HeadingDivider title='Adres Seçimi' />

            <AddressSelectComponent
                navigation={navigation}
                token={token}
                setNeedToLoginPopupState={setNeedToLoginPopupState}
                title={selectedAddressObj?.addressTitle ?? 'Adres Seçiniz'}
                subTitle={selectedAddressObj?.openAddress ?? 'Adres Seçiniz'} />

            <HeadingDivider title='Ödeme Şekli' />

            <PaymentTypeSelectComponent
                navigation={navigation}
                token={token}
                setNeedToLoginPopupState={setNeedToLoginPopupState}
                title={selectedCardObj?.cardAlias ?? 'Kart Seçiniz'}
                subTitle={selectedCardObj?.cardNumber ?? 'Kart Seçiniz'} />

            <HeadingDivider title='Kargo Ücreti' />

            <CargoPriceComponent />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const mapStateToProps = ({
    paymentReducer: {
        cards, addresses, selectedCard, selectedAddress
    },
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

export default ShadowContainerHoc(connect(mapStateToProps, mapDispatchToProps)(CompletePaymentContent))
