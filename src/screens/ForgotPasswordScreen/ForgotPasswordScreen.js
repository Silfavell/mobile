import React from 'react'

import { ScrollView } from 'react-native'

import ForgotPasswordForm from './ForgotPasswordForm'

const ForgotPasswordScreen = (props) => (
    <ScrollView>
        <ForgotPasswordForm {...props} />
    </ScrollView>
)
export default ForgotPasswordScreen
