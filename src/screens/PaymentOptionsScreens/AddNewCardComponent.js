import React from 'react'

import { View, TouchableOpacity, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { COLORS } from '../../scripts/colors'

class AddNewCardComponent extends React.PureComponent {
    onClick = () => {
        this.props.navigation.navigate('addNewCardScreen')
    }

    render() {
        return (
            <>
                <TouchableOpacity style={styles.container} onPress={this.onClick}>
                    <View style={styles.child}>
                        <View style={styles.iconContainer}>
                            <Ionicons name='md-add' size={32} color={COLORS.TERTIARY} />
                        </View>
                    </View>
                    <View style={[styles.child, styles.textContainer]}>
                        <View style={styles.child}>
                            <Text style={styles.highlightedText}>Yeni kart ekle</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.child}>
                        <View style={styles.emptyIcon} />
                    </TouchableOpacity>
                </TouchableOpacity>

                {
                    //  <TouchableOpacity style={styles.container}>
                    //      <View style={styles.child}>
                    //          <Ionicons name={'md-add'} size={32} color={'rgba(0,0,0,.8)'} />
                    //      </View>
                    //      <View style={[styles.child, { flex: 1, alignItems: 'flex-start', marginHorizontal: 6 }]}>
                    //          <View style={styles.child}>
                    //              <Text style={styles.highlightedText}>{'Add Card with BKM Express'}</Text>
                    //          </View>
                    //      </View>
                    //      <TouchableOpacity style={styles.child}>
                    //          <Ionicons name={'md-trash'} size={32} color={'rgba(0,0,0,.8)'} />
                    //      </TouchableOpacity>
                    //  </TouchableOpacity>
                }
            </>
        )
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 8,
        marginHorizontal: 6
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
    iconContainer: {
        height: 24,
        width: 36,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyIcon: {
        height: 32
    },
    textContainer: {
        flex: 1,
        alignItems: 'flex-start',
        marginHorizontal: 6
    }
})

export default AddNewCardComponent
