import React from 'react'

import {
    View,
    Text
} from 'react-native'
import CheckBox from 'react-native-check-box'
import { ScaledSheet } from 'react-native-size-matters'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import MembershipAgreement from './MembershipAgreement'

class TermsComponent extends React.Component {
    state = {
        scaleAnimationModal: false
    }

    setPopupState = (state) => {
        this.setState(state)
    }

    showAgreement = () => {
        this.setState({ scaleAnimationModal: true })
    }

    render() {
        return (
            <View style={styles.container}>
                <MembershipAgreement
                    scaleAnimationModal={this.state.scaleAnimationModal}
                    setPopupState={this.setPopupState} />

                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        style={styles.checkBoxStyle}
                        checkedImage={<MaterialIcons name='check' size={24} color='black' />}
                        unCheckedImage={<MaterialIcons name='check-box-outline-blank' size={24} color='black' />}
                        onClick={this.props.setTermsState}
                        isChecked={this.props.isTermsChecked} />
                </View>
                <View style={styles.termsInfoContainer}>
                    <View style={styles.termsTextContainer}>
                        <Text style={styles.termsText}>
                            <Text onPress={this.showAgreement} style={styles.termsAgreementText}>Üyelik Sözleşmesi</Text>
                            {' '}
                            şartlarını okudum ve kabul ediyorum.
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = ScaledSheet.create({
    container: {
        height: '60@s',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: '8@s',
        marginHorizontal: '12@s'
    },
    checkBoxContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    termsText: {
        color: 'rgba(0,0,0,.8)', fontSize: '16@s', fontWeight: 'bold'
    },
    termsLinkText: {
        color: 'rgba(0,0,0,.8)', fontSize: '16@s', fontWeight: 'bold'
    },
    termsTextContainer: {
        alignItems: 'center', justifyContent: 'center', flexDirection: 'row'
    },
    termsInfoContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        marginLeft: '8@s'
    },
    checkBoxStyle: {
        height: 24
    },
    termsAgreementText: {
        color: '#5050FF'
    }
})

export default TermsComponent
