import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'

import ClickableSettingItem from '../../components/ClickableSettingItem'
import HeadingDivider from '../../components/HeadingDivider'
import ShadowContainerHoc from '../../components/ShadowContainerHoc'
import { COLORS } from '../../scripts/colors'

class AddressesFooter extends React.PureComponent {
    moveToSearchAddress = () => {
        this.props.navigation.navigate('searchAddressScreen')
    }

    render() {
        return (
            <>
                <HeadingDivider title='Adres ekle' />

                <ClickableSettingItem title='Yeni adres' onClick={this.moveToSearchAddress}>
                    <Ionicons color={COLORS.PRIMARY} name='md-locate' size={32} />
                    <Ionicons color={COLORS.PRIMARY} name='md-add' size={32} />
                </ClickableSettingItem>

                {
                //  <ClickableSettingItem title={'Add home address'} onClick={() => {
                //      navigation.navigate('searchAddressScreen')
                //  }}>
                //      <Ionicons color={'rgba(0,0,0,.8)'} name={'md-home'} size={32} />
                //      <Ionicons color={'rgba(0,0,0,.8)'} name={'md-add'} size={32} />
                //  </ClickableSettingItem>
                //
                //  <ClickableSettingItem title={'Add work address'} onClick={() => { console.log('Add work address') }}>
                //      <Ionicons color={'rgba(0,0,0,.8)'} name={'md-business'} size={32} />
                //      <Ionicons color={'rgba(0,0,0,.8)'} name={'md-add'} size={32} />
                //  </ClickableSettingItem>
                //
                //  <ClickableSettingItem title={'Add other address'} onClick={() => { console.log('Add other address') }}>
                //      <Ionicons color={'rgba(0,0,0,.8)'} name={'md-locate'} size={32} />
                //      <Ionicons color={'rgba(0,0,0,.8)'} name={'md-add'} size={32} />
                //  </ClickableSettingItem>
                }
            </>
        )
    }
}

export default ShadowContainerHoc(AddressesFooter)
