import React from 'react'

import {
    ScrollView, View, Text
} from 'react-native'
import joi from 'react-native-joi'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { saveCard } from '../../actions/payment-actions'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputComponent from '../../components/InputComponent/InputComponent'
import { COLORS } from '../../scripts/colors'

class AddNewCardScreen extends React.Component {
    state = {
        cardAlias: '',
        cardHolderName: this.props.user.nameSurname,
        cardNumber: '',
        expireYear: '',
        expireMonth: '',

        invalidCardAlias: false,
        // invalidCardHolderName: false,
        invalidCardNumber: false,

        isCardAliasInitialized: false,
        // isCardHolderNameInitialized: true,
        isCardNumberInitialized: false,
        isExpireYearInitialized: false,
        isExpireMonthInitialized: false
    }

    onContinueClick = () => {
        const {
            cardAlias, cardHolderName, cardNumber, expireYear, expireMonth
        } = this.state

        this.props.saveCard(
            {
                cardAlias,
                cardHolderName,
                cardNumber: cardNumber.split(' ').join(''),
                expireYear,
                expireMonth
            },
            () => {
                this.props.navigation.goBack()
            }
        )
    }

    onAliasChange = (cardAlias) => {
        joi
            .string()
            .min(1)
            .validate(cardAlias, (err) => {
                this.setState({ cardAlias, isCardAliasInitialized: true, invalidCardAlias: !!err })
            })
    }

    onCardNumberChange = (formatted, extracted) => {
        joi
            .string()
            .min(16)
            .max(16)
            .creditCard()
            .validate(formatted.split(' ').join(''), (err) => {
                this.setState({ cardNumber: extracted, isCardNumberInitialized: true, invalidCardNumber: !!err })
            })
    }

    onExpireMonthChange = ({ label }) => {
        this.setState({ expireMonth: label, isExpireMonthInitialized: true })
    }

    onExpireYearChange = ({ label }) => {
        this.setState({ expireYear: label, isExpireYearInitialized: true })
    }

    getYearSelectorValues = () => {
        const years = Array.from(new Array(20)).map((_, index) => ({
            key: `year${index}`,
            label: (new Date().getFullYear() + index).toString()
        }))

        return years
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View>
                    <View style={styles.header}>
                        <View style={styles.imageContainer}>
                            <Ionicons color={COLORS.PRIMARY} name='ios-card' size={95} />
                        </View>

                        <View style={styles.infoContainer}>
                            <View>
                                <Text style={styles.securityText}>Güvenlik</Text>
                            </View>

                            <View>
                                <Text style={styles.securityInformation}>
                                    {
                                        // TODO
                                    }
                                    Kredi kartı bilgileriniz Silfavell tarafından tutulmamaktadır ödeme altyapısı
                                    Iyzico tarafından sağlanmaktadır.
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <InputComponent
                            options={{
                                placeholder: 'Kart etiketi (Kişisel, İş vb.)',
                                maxLength: 20
                            }}
                            onChange={this.onAliasChange}
                            invalid={this.state.invalidCardAlias && this.state.isCardAliasInitialized}
                            value={this.state.cardAlias} />

                        <InputComponent
                            options={{
                                placeholder: 'Kart Numarası',
                                maxLength: 19,
                                keyboardType: 'number-pad'
                            }}
                            invalid={this.state.invalidCardNumber && this.state.isCardNumberInitialized}
                            mask='card'
                            onChange={this.onCardNumberChange}
                            value={this.state.cardNumber} />

                        <View style={styles.row}>
                            <View style={styles.inputContainer}>
                                <InputComponent
                                    options={{
                                        placeholder: 'Ay',
                                        maxLength: 2,
                                        keyboardType: 'number-pad'
                                    }}
                                    invalid={this.state.invalidExpireMonth && this.state.isExpireMonthInitialized}
                                    selector={[
                                        {
                                            key: 0,
                                            label: '01'
                                        },
                                        {
                                            key: 1,
                                            label: '02'
                                        },
                                        {
                                            key: 2,
                                            label: '03'
                                        },
                                        {
                                            key: 3,
                                            label: '04'
                                        },
                                        {
                                            key: 4,
                                            label: '05'
                                        },
                                        {
                                            key: 5,
                                            label: '06'
                                        },
                                        {
                                            key: 6,
                                            label: '07'
                                        },
                                        {
                                            key: 7,
                                            label: '08'
                                        },
                                        {
                                            key: 8,
                                            label: '09'
                                        },
                                        {
                                            key: 9,
                                            label: '10'
                                        },
                                        {
                                            key: 10,
                                            label: '11'
                                        },
                                        {
                                            key: 11,
                                            label: '12'
                                        }
                                    ]}
                                    setPickedValue={this.onExpireMonthChange}
                                    onChange={this.onExpireMonthChange}
                                    value={this.state.expireMonth} />
                            </View>

                            <View style={styles.inputContainer}>
                                <InputComponent
                                    options={{
                                        placeholder: 'Yıl',
                                        keyboardType: 'number-pad'
                                    }}
                                    invalid={this.state.invalidExpireYear && this.state.isExpireYearInitialized}
                                    selector={this.getYearSelectorValues()}
                                    setPickedValue={this.onExpireYearChange}
                                    onChange={this.onExpireYearChange}
                                    value={this.state.expireYear} />
                            </View>
                        </View>
                    </View>
                </View>
                {
                    // <TermsComponent />
                }
                <ButtonComponent
                    text='Tamamla'
                    onClick={this.onContinueClick}
                    disabled={
                        this.state.invalidCardAlias
                || !this.state.isCardAliasInitialized
                || this.state.invalidCardNumber
                || !this.state.isCardNumberInitialized
                || this.state.invalidExpireYear
                || !this.state.isExpireYearInitialized
                || this.state.invalidExpireMonth
                || !this.state.isExpireMonthInitialized
                    } />
            </ScrollView>
        )
    }
}
const styles = ScaledSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: COLORS.LIGHT
    },
    header: {
        flexDirection: 'row'
    },
    imageContainer: {
        margin: '10@s',
        paddingHorizontal: '5@s',
        marginLeft: '12@s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    caseImage: {
        width: '95@s',
        height: '105@s',
        borderRadius: 8
    },
    securityText: {
        color: COLORS.SECONDARY,
        fontSize: '19@s',
        fontWeight: 'bold'
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: '10@s',
        marginRight: '12@s'
    },
    securityInformation: {
        color: COLORS.DARK_GRAY,
        fontSize: '15@s'
    },
    row: {
        flexDirection: 'row'
    },
    inputContainer: {
        flex: 1
    }
})

const mapStateToProps = ({ sourceReducer: { user } }) => ({
    user
})

const mapDispatchToProps = {
    saveCard
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCardScreen)
