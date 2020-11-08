import React from 'react'

import {
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

import pckg from '../../../package.json'
import SettingItem from '../../components/SettingItem'
import ShadowContainerHoc from '../../components/ShadowContainerHoc'
import { COLORS } from '../../scripts/colors'
import LogoutItem from './LogoutItem'

class ProfileScreen extends React.Component {
    moveToEditProfileScreen = () => {
        this.props.navigation.navigate('editProfileScreen')
    }

    moveToAddress = () => {
        this.props.navigation.navigate('addresses')
    }

    moveToPaymentOptions = () => {
        this.props.navigation.navigate('paymentOptionsScreen')
    }

    moveToFavoriteProducts = () => {
        this.props.navigation.navigate('favoriteProductsScreen')
    }

    moveToPreviousOrders = () => {
        this.props.navigation.navigate('previousOrdersScreen')
    }

    moveToChangePasssword = () => {
        this.props.navigation.navigate('changePasswordScreen')
    }

    moveToLogin = () => {
        this.props.navigation.navigate('Welcome', { screen: 'login' })
    }

    moveToHelp = () => {
        this.props.navigation.navigate('helpScreen')
    }

    render() {
        return (
            <ScrollView>
                {
                    this.props.token
                        ? (
                            <>
                                <TouchableOpacity activeOpacity={0.9} onPress={this.moveToEditProfileScreen}>
                                    <SettingItem title={this.props.user.nameSurname}>
                                        <Ionicons color={COLORS.TERTIARY} name='md-person' size={32} />
                                    </SettingItem>
                                </TouchableOpacity>

                                {
                                    //  <SettingItem title={'muhammetipek57@hotmail.com'}>
                                    //      <Ionicons color={'rgba(0,0,0,.8)'} name={'md-mail-open'} size={32} />
                                    //  </SettingItem>
                                    //
                                    //  <SettingItem title={'(546) 813-3198'}>
                                    //      <Ionicons color={'rgba(0,0,0,.8)'} name={'md-phone-portrait'} size={32} />
                                    //  </SettingItem>
                                }

                                <TouchableOpacity activeOpacity={0.9} onPress={this.moveToAddress}>
                                    <SettingItem title='Adreslerim'>
                                        <MaterialIcons color={COLORS.TERTIARY} name='place' size={32} />
                                    </SettingItem>
                                </TouchableOpacity>

                                <TouchableOpacity activeOpacity={0.9} onPress={this.moveToPaymentOptions}>
                                    <SettingItem title='Ödeme Seçeneklerim'>
                                        <Ionicons color={COLORS.TERTIARY} name='ios-card' size={32} />
                                    </SettingItem>
                                </TouchableOpacity>

                                <TouchableOpacity activeOpacity={0.9} onPress={this.moveToFavoriteProducts}>
                                    <SettingItem title='Favorilerim'>
                                        <Ionicons color={COLORS.TERTIARY} name='md-heart' size={32} />
                                    </SettingItem>
                                </TouchableOpacity>

                                <TouchableOpacity activeOpacity={0.9} onPress={this.moveToPreviousOrders}>
                                    <SettingItem title='Siparişlerim'>
                                        <Ionicons color={COLORS.TERTIARY} name='ios-copy' size={32} />
                                    </SettingItem>
                                </TouchableOpacity>

                                {

                                    //  <SettingItem title={'Previous Orders'}>
                                    //      <Ionicons color={'rgba(0,0,0,.8)'} name={'md-basket'} size={32} />
                                    //  </SettingItem>
                                    //
                                    //  <SettingItem title={'Previous Invoices'}>
                                    //      <Ionicons color={'rgba(0,0,0,.8)'} name={'md-document'} size={32} />
                                    //  </SettingItem>
                                    //
                                    //  <SettingItem title={'Invoice Information'}>
                                    //      <Ionicons color={'rgba(0,0,0,.8)'} name={'md-document'} size={32} />
                                    //  </SettingItem>
                                }

                                <TouchableOpacity activeOpacity={0.9} onPress={this.moveToChangePasssword}>
                                    <SettingItem title='Şifremi Değiştir'>
                                        <Ionicons color={COLORS.TERTIARY} name='ios-key' size={32} style={styles.iconContainer} />
                                    </SettingItem>
                                </TouchableOpacity>

                                {
                                    //  <SettingItem title={'Communication Options'}>
                                    //      <Ionicons color={'rgba(0,0,0,.8)'} name={'md-notifications'} size={32} />
                                    //  </SettingItem>
                                    //
                                    //  <SettingItem title={'Support'}>
                                    //      <Ionicons color={'rgba(0,0,0,.8)'} name={'md-help-circle-outline'} size={32} />
                                    //  </SettingItem>
                                }

                                <TouchableOpacity activeOpacity={0.9} onPress={this.moveToHelp}>
                                    <SettingItem title='Destek'>
                                        <Ionicons color={COLORS.TERTIARY} name='md-information-circle' size={32} />
                                    </SettingItem>
                                </TouchableOpacity>

                                <LogoutItem navigation={this.props.navigation} />
                            </>
                        )
                        : (
                            <>
                                <TouchableOpacity activeOpacity={0.9} onPress={this.moveToLogin}>
                                    <SettingItem title='Giriş Yap'>
                                        <Ionicons color={COLORS.TERTIARY} name='md-person' size={32} />
                                    </SettingItem>
                                </TouchableOpacity>

                                <TouchableOpacity activeOpacity={0.9} onPress={this.moveToHelp}>
                                    <SettingItem title='Destek'>
                                        <Ionicons color={COLORS.TERTIARY} name='md-information-circle' size={32} />
                                    </SettingItem>
                                </TouchableOpacity>
                            </>
                        )
                }

                {
                    //  <TouchableOpacity activeOpacity={0.9} onPress={() => { navigation.navigate('changeLanguageScreen') }}>
                    //      <SettingItem title={'English'} />
                    //  </TouchableOpacity>
                }

                <SettingItem title={pckg.version} version emptyIcon />

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    iconContainer: {
        transform:
            [
                {
                    rotateY: '180deg'
                },
                {
                    rotateX: '180deg'
                }
            ]
    }
})

const mapStateToProps = ({
    sourceReducer: {
        token,
        user
    }
}) => ({
    token,
    user
})

export default ShadowContainerHoc(connect(mapStateToProps)(ProfileScreen))
