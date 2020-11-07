import React from 'react'

import { ScrollView, View, TextInput } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { saveAddress } from '../../actions/payment-actions'
import ButtonComponent from '../../components/ButtonComponent'
import ConfirmAddressPopup from '../../components/popups/ConfirmAddressPopup'
import CompleteAddressInput from '../MapScreens/CompleteAddressInput'
import Map from '../MapScreens/Map'

class CompleteAddressScreen extends React.Component {
        state = {
            scaleAnimationModal: false,
            addressTitle: ''
        }

        shouldComponentUpdate(_, nextState) {
            return (
                nextState.scaleAnimationModal !== this.state.scaleAnimationModal
            || nextState.addressTitle !== this.state.addressTitle
            )
        }

        setPopupState = (scaleAnimationModal, complete, address) => {
            this.setState({ scaleAnimationModal })
            if (complete) {
                this.props.saveAddress(address, this.state)
                this.props.navigation.pop(3)
            }
        }

        onAddressTitleChange = (addressTitle) => {
            this.setState({ addressTitle })
        }

        onSaveClick = () => {
            this.setPopupState(true)
        }

        render() {
            return (
                <ScrollView contentContainerStyle={styles.container}>
                    <ConfirmAddressPopup
                        scaleAnimationModal={this.state.scaleAnimationModal}
                        setPopupState={this.setPopupState} />
                    <View>
                        <View style={styles.mapContainer}>
                            <Map region={this.props.route.params.region} />

                            <View style={styles.markerContainer} pointerEvents='none'>
                                <Ionicons color='rgba(0,0,0,.8)' size={48} name='md-pin' />
                            </View>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.inputContainerChild}>
                                {
                                    //  <View style={styles.inputContainer}>
                                    //      <TextInput
                                    //          placeholder={'Address Icon'}
                                    //          style={styles.input} />
                                    //  </View>
                                }
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        onChangeText={this.onAddressTitleChange}
                                        value={this.state.addressTitle}
                                        placeholder='Address title (Home, Work)'
                                        style={styles.input} />
                                </View>
                            </View>
                            <View style={styles.addressinputContainerChild}>
                                <View style={styles.addressInputContainer}>
                                    <CompleteAddressInput />
                                </View>
                            </View>
                        </View>
                    </View>
                    <ButtonComponent
                        disabled={!(this.state.addressTitle.length > 0) || !(this.props.address.length > 0)}
                        text='Kaydet'
                        onClick={this.onSaveClick} />
                </ScrollView>
            )
        }
}

const styles = ScaledSheet.create({
    container: { flexGrow: 1, justifyContent: 'space-between' },
    mapContainer: { height: '136@s' },
    body: { marginVertical: '12@s' },
    markerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '2@s'
    },
    inputContainer: { height: '60@s', margin: '2@s', flex: 1 },
    inputContainerChild: {
        height: '60@s',
        margin: '2@s',
        display: 'flex',
        flexDirection: 'row'
    },
    addressInputContainer: { height: '120@s', margin: '2@s', flex: 1 },
    addressinputContainerChild: {
        height: '120@s',
        margin: '2@s',
        display: 'flex',
        flexDirection: 'row'
    },
    input: {
        flex: 1,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: '3@s',
        borderRadius: 8,
        borderColor: '#C3C3C3',
        paddingHorizontal: '13@s',
        fontSize: '17@s'
    }
})

const mapStateToProps = ({ mapReducer: { address } }) => ({
    address
})

const mapDispatchToProps = {
    saveAddress
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteAddressScreen)
