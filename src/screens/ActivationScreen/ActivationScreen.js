import React from 'react'

import { ScrollView } from 'react-native'

import ActivationForm from './ActivationForm'

const ActivationScreen = (props) => (
    <ScrollView>
        <ActivationForm {...props} />
    </ScrollView>
)

export default ActivationScreen
