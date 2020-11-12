import React from 'react'

import { View, Text, FlatList } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'

import LoadingComponent from '../../components/LoadingComponent'
import OrderComponent from '../../components/OrderComponent'
import { COLORS } from '../../scripts/colors'
import { getOrders } from '../../scripts/requests'

class PreviousOrdersScreen extends React.Component {
    state = {
        orders: [],
        fetching: true
    }

    async componentDidMount() {
        try {
            const { status, data } = await getOrders()

            if (status === 200) {
                this.setState({ orders: data, fetching: false })
            } else {
                this.setState({ fetching: false })
            }
        } catch (error) {
            this.setState({ fetching: false })
        }
    }

    keyExtractor = (item) => item._id

    render() {
        if (this.state.fetching) {
            return <LoadingComponent />
        }

        if (this.state.orders.length > 0) {
            return (
                <View style={styles.conteiner2}>
                    <FlatList
                        data={this.state.orders}
                        keyExtractor={this.keyExtractor}
                        renderItem={({ item }) => (
                            <OrderComponent
                                item={item}
                                navigation={this.props.navigation} />
                        )} />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Ionicons name='ios-copy' size={96} color={COLORS.PRIMARY} />
                <Text style={styles.emptyText}>Siparişiniz bulunmamaktadır</Text>
            </View>
        )
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.GRAY
    },
    emptyText: {
        marginTop: 32,
        fontSize: '18@s',
        textAlign: 'center',
        color: COLORS.DARK
    },
    conteiner2: {
        flex: 1
    }
})

export default PreviousOrdersScreen
