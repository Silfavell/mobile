import React from 'react'
import { View, TouchableOpacity, TextInput, Text, StyleSheet } from 'react-native'

class ForgotPasswordScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.child, { flexDirection: 'row' }]}>
                    {
                        //  <TextInput
                        //      keyboardType={'phone-pad'} placeholder={'Country/Region Code'}
                        //      style={styles.input} />
                    }

                    <TextInput keyboardType={'phone-pad'} placeholder={'Phone Number'} style={styles.input} />
                </View>
                <View style={styles.child}>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate('resetPassword') }}
                        style={styles.sendCodeButton}>
                        <Text style={styles.sendCodeText}>Send Code</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.child} />
                <View style={styles.child} />
                <View style={styles.child} />
                <View style={styles.child} />
                <View style={styles.child} />
                <View style={styles.child} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, marginVertical: 12 },
    child: { flex: 1, margin: 3 },
    input: { flex: 1, margin: 4, borderRadius: 6, paddingHorizontal: 12, fontSize: 19, borderWidth: .8, borderColor: '#ABABAB' },
    sendCodeButton: { backgroundColor: '#5D3EBD', flex: 1, margin: 4, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
    sendCodeText: { color: 'white', fontSize: 19 }
})

export default ForgotPasswordScreen