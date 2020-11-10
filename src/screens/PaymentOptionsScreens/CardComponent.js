import React from 'react'

import {
    View,
    TouchableOpacity,
    Text,
    Image
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { setSelectedCard } from '../../actions/payment-actions'
import { COLORS } from '../../scripts/colors'

import mastercard from '../../../assets/mastercard.png'
import visa from '../../../assets/visa.png'

const getCardIcon = (type) => {
    switch (type) {
        case 'MASTER_CARD': return mastercard
        case 'VISA': return visa
        default: return visa
    }
}

class CardComponent extends React.PureComponent {
    onClick = () => {
        const {
            item,
            navigation,
            setSelectedCard
        } = this.props

        setSelectedCard(item.cardToken, () => {
            navigation.goBack()
        })
    }

    onDeleteClick = () => {
        const { item, setPopupState } = this.props
        setPopupState({ scaleAnimationModal: true, selectedCard: item.cardToken })
    }

    render() {
        const { item } = this.props

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.childContainer} onPress={this.onClick}>
                    <View style={styles.child}>
                        <Image
                            style={styles.cardImage}
                            resizeMode='contain'
                            resizeMethod='resize'
                            source={getCardIcon(item.cardAssociation)} />
                    </View>
                    <View style={[styles.child, styles.textContainer]}>
                        <View style={styles.child}>
                            <Text style={styles.cardName}>{item.cardAlias}</Text>
                        </View>
                        <View style={styles.child}>
                            <Text style={styles.cardNumber}>{`•••• •••• •••• ${item.lastFourDigits}`}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.child} onPress={this.onDeleteClick}>
                    <Ionicons name='md-trash' size={32} color={COLORS.TERTIARY} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 8,
        marginHorizontal: 6,
        borderBottomWidth: 0.4,
        borderBottomColor: COLORS.TERTIARY
    },
    child: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8
    },
    cardName: {
        fontSize: '16@s'
    },
    cardNumber: {
        fontSize: '15@s',
        color: COLORS.GRAY
    },
    highlightedText: {
        fontSize: '16@s',
        color: COLORS.TERTIARY
    },
    cardImage: {
        height: 24,
        width: 36
    },
    textContainer: {
        flex: 1,
        alignItems: 'flex-start',
        marginHorizontal: 6
    },
    childContainer: {
        flex: 1,
        flexDirection: 'row'
    }
})

const mapDispatchToProps = {
    setSelectedCard
}

export default connect(null, mapDispatchToProps)(CardComponent)
