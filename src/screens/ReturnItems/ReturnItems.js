import React from 'react'

import {
    View,
    FlatList,
    Text,
    TouchableOpacity
} from 'react-native'
import CheckBox from 'react-native-check-box'
import { ScaledSheet } from 'react-native-size-matters'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import ButtonComponent from '../../components/ButtonComponent'
import CartProduct from '../../components/CartProduct'
import { COLORS } from '../../scripts/colors'
import { returnItems } from '../../scripts/requests'

class ReturnItems extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            items: this.props.route.params.item.products.map((product) => ({
                _id: product._id,
                quantity: 1,
                selected: false,
                increaseProductQuantity: this.increaseProductQuantity,
                decreaseProductQuantity: this.decreaseProductQuantity,
                setProductQuantity: this.setProductQuantity
            }))
        }
    }

    increaseProductQuantity = (_id) => {
        const { items } = this.state

        const selectedItem = items.find((item) => item._id === _id)
        const selectedOrderItem = this.props.route.params.item.products.find((product) => product._id === _id)
        if (selectedItem.quantity + 1 <= selectedOrderItem.quantity) {
            selectedItem.quantity += 1
        }

        this.setState({ items })

        return selectedItem.quantity
    }

    decreaseProductQuantity = (_id) => {
        const { items } = this.state

        const selectedItem = items.find((item) => item._id === _id)
        if (selectedItem.quantity - 1 > 0) {
            selectedItem.quantity -= 1
        }

        this.setState({ items })

        return selectedItem.quantity
    }

    setProductQuantity = (_id, quantity) => {
        const { items } = this.state

        const selectedItem = items.find((item) => item._id === _id)
        const selectedOrderItem = this.props.route.params.item.products.find((product) => product._id === _id)

        if (quantity > selectedOrderItem.quantity) {
            selectedItem.quantity = selectedOrderItem.quantity
        } else {
            selectedItem.quantity = quantity
        }

        this.setState({ items })

        return selectedItem.quantity
    }

    onSelect = (_id) => {
        const { items } = this.state

        const selectedItem = items.find((item) => item._id === _id)
        selectedItem.selected = !selectedItem.selected
        this.setState({ items })
    }

    onFinishClick = async () => {
        const items = this.state.items
            .filter((item) => item.selected)
            .map((item) => {
                delete item.selected

                return item
            })

        const { status } = await returnItems(this.props.route.params.item._id, items)

        if (status === 200) {
            this.props.navigation.navigate('returnItemsCompleted')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailContainer}>
                        <Text>Iade etmek istediğiniz ürünleri ve adedini seçiniz: </Text>
                    </View>
                </View>

                <FlatList
                    data={this.props.route.params.item.products}
                    // keyExtractor={(item, index) => item._id + ':' + this.state.items[index].quantity}
                    renderItem={({ item, index }) => (
                        <View>
                            <TouchableOpacity
                                style={styles.button}
                                activeOpacity={0.9}
                                onPress={() => {
                                    this.onSelect(item._id)
                                }}>
                                <CheckBox
                                    checkedImage={<MaterialIcons name='check' size={40} color='black' />}
                                    unCheckedImage={<MaterialIcons name='check-box-outline-blank' size={40} color={COLORS.SECONDARY} />}
                                    disabled
                                    isChecked={this.state.items[index].selected} />
                            </TouchableOpacity>

                            <CartProduct
                                data={item}
                                returnItem={this.state.items[index]} />
                        </View>
                    )} />
                <ButtonComponent text='Tamamla' onClick={this.onFinishClick} />
            </View>
        )
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 6,
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
    },
    button: {
        position: 'absolute',
        top: 5,
        left: 5,
        zIndex: 5,
        backgroundColor: 'white'
    }
})

export default ReturnItems
