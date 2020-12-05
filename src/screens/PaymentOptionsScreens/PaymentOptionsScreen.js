import React from 'react'

import { ScrollView } from 'react-native'

import CardList from './CardList'

const PaymentOptionsScreen = (props) => (
    <ScrollView>
        <CardList {...props} />
    </ScrollView>
)

export default PaymentOptionsScreen
