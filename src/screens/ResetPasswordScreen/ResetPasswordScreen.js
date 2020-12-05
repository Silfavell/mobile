import React from 'react'

import { ScrollView } from 'react-native'

import ResetPasswordForm from './ResetPasswordForm'

const ResetPasswordScreen = (props) => (
    <ScrollView>
        <ResetPasswordForm {...props} />
    </ScrollView>
)

export default ResetPasswordScreen
