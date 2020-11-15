import React from 'react'

import { ScrollView } from 'react-native'

import ChangePasswordForm from './ChangePasswordForm'

const ChangePasswordScreen = ({ navigation }) => (
    <ScrollView>
        <ChangePasswordForm navigation={navigation} />
    </ScrollView>

)

export default ChangePasswordScreen
