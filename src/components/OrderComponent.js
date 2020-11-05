import React from 'react'

import {
    View, TouchableOpacity, Text, Linking
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import OrderStatus from '../models/OrderStatus'
import OrderCarousel from './OrderCarousel'
import SettingItem from './SettingItem'

class OrderComponent extends React.PureComponent {
  getStatusText = (status) => {
      switch (status) {
          case OrderStatus.WAITING_FOR_APPROVAL:
              return 'Onay Bekliyor'
          case OrderStatus.APPROVED:
              return 'Onaylandı'
          case OrderStatus.CANCELED:
              return 'Iptal Edildi'
          case OrderStatus.RETURNED:
              return 'Iade Talep Edildi'
          case OrderStatus.RETURN_ACCEPTED:
              return 'Iade Kabul Edildi'
          case OrderStatus.RETURN_DENIED:
              return 'Iade Reddedildi'
          default:
              return 'Onaylandı'
      }
  };

  onCargoTrackClick = () => {
      Linking.openURL(
          `http://kargotakip.araskargo.com.tr/mainpage.aspx?code=${this.props.item.message}`
      )
  };

  onReturnClick = () => {
      this.props.navigation.navigate('returnItems', { item: this.props.item })
  };

  renderFooter = () => {
      switch (this.props.item.status) {
          case OrderStatus.APPROVED: {
              return (
                  <TouchableOpacity activeOpacity={0.6} onPress={this.onCargoTrackClick}>
                      <SettingItem title='Kargo Takip' order />
                  </TouchableOpacity>
              )
          }

          case OrderStatus.RETURNABLE: {
              return (
                  <TouchableOpacity activeOpacity={0.6} onPress={this.onReturnClick}>
                      <SettingItem title='Iade Talebinde Bulun' order />
                  </TouchableOpacity>
              )
          }

          default:
              return null
      }
  };

  render() {
      const {
          item: {
              date, paidPrice, returnItemsTotalPayback, products, returnItems, status
          }
      } = this.props

      return (
          <View style={styles.container}>
              <View style={styles.detailsContainer}>
                  <View style={styles.detailContainer}>
                      <Text>Sipariş Tarihi:</Text>
                      <Text>
                          {new Date(date).toLocaleDateString('tr-TR', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                          })}
                      </Text>
                  </View>

                  <View style={styles.detailContainer}>
                      <Text>Ödenen Tutar:</Text>
                      <Text>{`₺${paidPrice.toFixed(2).replace('.', ',')}`}</Text>
                  </View>

                  <View style={styles.detailContainer}>
                      <Text>Sipariş Durumu:</Text>
                      <Text>{this.getStatusText(status)}</Text>
                  </View>
              </View>

              <OrderCarousel products={products} previousOrder />

              {status === 5 && (
                  <>
                      <View style={styles.detailsContainer2}>
                          <View style={styles.detailContainer}>
                              <Text>Iade Edilecek Toplam Tutar:</Text>
                              <Text>{`₺${returnItemsTotalPayback.toFixed(2).replace('.', ',')}`}</Text>
                          </View>

                          <View style={styles.detailContainer}>
                              <Text>Iade Edilen Urunler:</Text>
                          </View>
                      </View>

                      <OrderCarousel products={returnItems} previousOrder />
                  </>
              )}

              {this.renderFooter()}
          </View>
      )
  }
}

const styles = ScaledSheet.create({
    container: {
        marginHorizontal: 6,
        marginVertical: 12,
        padding: 6,
        display: 'flex',
        borderWidth: 1,
        borderColor: '#DFDFDF',
        backgroundColor: 'white'
    },
    detailsContainer: {
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#DFDFDF'
    },
    detailsContainer2: {
        paddingTop: 24,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#DFDFDF'
    },
    detailContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 4
    }
})

export default OrderComponent
