import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

const OrderNoteComponent = () => (
    <View style={styles.container}>
        <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
                <Ionicons size={32} name={'md-attach'} />
            </View>
            <View style={styles.infoContainer}>
                <TouchableOpacity style={styles.infoTextContainer} onPress={() => {
                    console.log('address')
                }}>
                    <Text style={styles.title}>{'Siparişinizle ilgili tüm detayları (soğuk kola vb...) belirtebilir, sonra kullanmak üzere kaydedebilirsiniz.'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.showSavedNotesContainer} onPress={() => {
                    const showSavedNotes = () => {
                        console.log('show saved notes')
                    }
                }}>
                    <View style={styles.showSavedNotesTextContainer}>
                        <Text style={styles.showSavedNotesText}>Kayıtlı notlarımı göster</Text>
                    </View>
                    <MaterialIcons color={'#ACACAC'} size={32} name={'chevron-right'} />
                </TouchableOpacity>
            </View>
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    rowContainer: {
        flexDirection: 'row'
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
        padding: 4,
        flex: 1
    },
    infoContainer: {
        flexDirection: 'column',
        marginHorizontal: 8,
        padding: 4,
        flex: 5
    },
    infoTextContainer: {
        flex: 1,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#D8D8D8'
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
        color: '#9C9C9C'
    },
    showSavedNotesContainer: {
        flexDirection: 'row',
        padding: 4
    },
    showSavedNotesText: {
        fontSize: 17,
        fontWeight: 'bold',
        marginVertical: 4
    },
    showSavedNotesTextContainer: {
        flex: 5
    }
})

export default OrderNoteComponent