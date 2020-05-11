import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import ClickableSettingItem from '../../components/ClickableSettingItem'
import HeadingDivider from '../../components/HeadingDivider'
import AddressList from '../../components/AddressList'
import ShadowContainer from '../../components/ShadowContainer'

class AddressesScreen extends React.PureComponent {
	moveToSearchAddress = () => {
		this.props.navigation.navigate('searchAddressScreen')
	}

	renderFooter = () => (
		<>
			<HeadingDivider title="Adres ekle" />

			<ClickableSettingItem title="Yeni adres" onClick={this.moveToSearchAddress}>
				<Ionicons color="#D000DB" name="md-locate" size={32} />
				<Ionicons color="#D000DB" name="md-add" size={32} />
			</ClickableSettingItem>

			{
				//  <ClickableSettingItem title={'Add home address'} onClick={() => {
				//      navigation.navigate('searchAddressScreen')
				//  }}>
				//      <Ionicons color={'#D000DB'} name={'md-home'} size={32} />
				//      <Ionicons color={'#D000DB'} name={'md-add'} size={32} />
				//  </ClickableSettingItem>
				//
				//  <ClickableSettingItem title={'Add work address'} onClick={() => { console.log('Add work address') }}>
				//      <Ionicons color={'#D000DB'} name={'md-business'} size={32} />
				//      <Ionicons color={'#D000DB'} name={'md-add'} size={32} />
				//  </ClickableSettingItem>
				//
				//  <ClickableSettingItem title={'Add other address'} onClick={() => { console.log('Add other address') }}>
				//      <Ionicons color={'#D000DB'} name={'md-locate'} size={32} />
				//      <Ionicons color={'#D000DB'} name={'md-add'} size={32} />
				//  </ClickableSettingItem>
			}
		</>
	)

	render() {
		return (
			<ShadowContainer>
				<AddressList navigation={this.props.navigation} footer={this.renderFooter} />
			</ShadowContainer>
		)
	}
}

export default AddressesScreen
