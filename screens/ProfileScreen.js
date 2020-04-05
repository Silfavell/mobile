import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

import SettingItem from '../components/SettingItem'
import LogoutItem from '../components/LogoutItem'

const ProfileScreen = ({ navigation }) => (
    <ScrollView>

        <SettingItem title={'Muhammet Ipek'}>
            <Ionicons color={'#4522A0'} name={'md-person'} size={32} />
        </SettingItem>

        <SettingItem title={'muhammetipek57@hotmail.com'}>
            <Ionicons color={'#4522A0'} name={'md-mail-open'} size={32} />
        </SettingItem>

        <SettingItem title={'(546) 813-3198'}>
            <Ionicons color={'#4522A0'} name={'md-phone-portrait'} size={32} />
        </SettingItem>

        <TouchableOpacity onPress={() => { navigation.navigate('addresses') }}>
            <SettingItem title={'Addresses'}>
                <MaterialIcons color={'#4522A0'} name={'place'} size={32} />
            </SettingItem>
        </TouchableOpacity>

        <SettingItem title={'Payment Options'}>
            <Ionicons color={'#4522A0'} name={'ios-card'} size={32} />
        </SettingItem>

        {
            //  <SettingItem title={'Favorite Products'}>
            //      <Ionicons color={'#4522A0'} name={'md-heart'} size={32} />
            //  </SettingItem>
            //  
            //  <SettingItem title={'Previous Orders'}>
            //      <Ionicons color={'#4522A0'} name={'md-basket'} size={32} />
            //  </SettingItem>
            //  
            //  <SettingItem title={'Previous Invoices'}>
            //      <Ionicons color={'#4522A0'} name={'md-document'} size={32} />
            //  </SettingItem>
            //  
            //  <SettingItem title={'Invoice Information'}>
            //      <Ionicons color={'#4522A0'} name={'md-document'} size={32} />
            //  </SettingItem>
        }

        <TouchableOpacity onPress={() => { navigation.navigate('changePasswordScreen') }}>
            <SettingItem title={'Change Password'}>
                <Ionicons color={'#4522A0'} name={'md-lock'} size={32} />
            </SettingItem>
        </TouchableOpacity>

        {
            //  <SettingItem title={'Communication Options'}>
            //      <Ionicons color={'#4522A0'} name={'md-notifications'} size={32} />
            //  </SettingItem>
            //  
            //  <SettingItem title={'Support'}>
            //      <Ionicons color={'#4522A0'} name={'md-help-circle-outline'} size={32} />
            //  </SettingItem>
        }

        <LogoutItem navigation={navigation} />

        <TouchableOpacity onPress={() => { navigation.navigate('changePasswordScreen') }}>
            <SettingItem title={'English'} />
        </TouchableOpacity>

        <SettingItem title={'1.0.0'} />

    </ScrollView>
)

export default ProfileScreen