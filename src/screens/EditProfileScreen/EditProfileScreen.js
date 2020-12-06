import React from 'react'

import { ScrollView } from 'react-native'

import EditProfileForm from './EditProfileForm'

const EditProfileScreen = (props) => (
    <ScrollView>
        <EditProfileForm {...props} />
    </ScrollView>
)

export default EditProfileScreen
