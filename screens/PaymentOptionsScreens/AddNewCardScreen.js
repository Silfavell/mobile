import React from 'react'
import { connect } from 'react-redux'
import {
	ScrollView,
	View,
	Image,
	Text,
	StyleSheet
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import joi from 'react-native-joi'

import { saveCard } from '../../actions/actions2'

import ButtonComponent from '../../components/ButtonComponent'
import InputComponent from '../../components/InputComponent'

import caseImage from '../../assets/case.png'

class AddNewCardScreen extends React.PureComponent {
	state = {
		cardAlias: '',
		cardHolderName: this.props.user.nameSurname,
		cardNumber: '',
		expireYear: '',
		expireMonth: '',

		invalidCardAlias: false,
		// invalidCardHolderName: false,
		invalidCardNumber: false,
		invalidExpireYear: false,
		// invalidExpireYear: false,
		invalidExpireMonth: false,

		isCardAliasInitialized: false,
		// isCardHolderNameInitialized: true,
		isCardNumberInitialized: false,
		isExpireYearInitialized: false,
		isExpireMonthInitialized: false
	}

	onContinueClick = () => {
		const {
			cardAlias,
			cardHolderName,
			cardNumber,
			expireYear,
			expireMonth
		} = this.state

		this.props.saveCard(({
			cardAlias,
			cardHolderName,
			cardNumber,
			expireYear: `20${expireYear}`,
			expireMonth
		}), () => {
			this.props.navigation.goBack()
		})
	}

	onAliasChange = (cardAlias) => {
		joi.string()
			.min(1)
			.validate(cardAlias, (err) => {
				this.setState({ cardAlias, isCardAliasInitialized: true, invalidCardAlias: !!err })
			})
	}

	onCardNumberChange = (cardNumber) => {
		joi.string()
			.min(16)
			.max(16)
			.creditCard()
			.validate(cardNumber, (err) => {
				this.setState({ cardNumber, isCardNumberInitialized: true, invalidCardNumber: !!err })
			})
	}

	onExpireMonthChange = (expireMonth) => {
		joi.string()
			.min(2)
			.max(2)
			.validate(expireMonth, (err) => {
				this.setState({ expireMonth, isExpireMonthInitialized: true, invalidExpireMonth: !!err })
			})
	}

	onExpireYearChange = (expireYear) => {
		joi.string()
			.min(2)
			.max(2)
			.validate(expireYear, (err) => {
				this.setState({ expireYear, isExpireYearInitialized: true, invalidExpireYear: !!err })
			})
	}

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<View>
					<View style={styles.header}>

						<View style={styles.imageContainer}>
							<Image style={styles.caseImage} source={caseImage} />
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
									Kredi kartı bilgileriniz App tarafından tutulmamaktadır ödeme altyapısı Iyzico tarafından sağlanmaktadır.
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
							invalid={
								this.state.invalidCardAlias && this.state.isCardAliasInitialized
							}
							value={this.state.cardAlias}
						/>

						<InputComponent
							options={{
								placeholder: 'Kart Numarası',
								maxLength: 16,
								keyboardType: 'number-pad'
							}}
							invalid={
								this.state.invalidCardNumber && this.state.isCardNumberInitialized
							}
							onChange={this.onCardNumberChange}
							value={this.state.cardNumber}
						/>

						<View style={styles.row}>

							<View style={styles.inputContainer}>
								<InputComponent
									options={{
										placeholder: 'Ay',
										maxLength: 2,
										keyboardType: 'number-pad'
									}}
									invalid={
										this.state.invalidExpireMonth && this.state.isExpireMonthInitialized
									}
									onChange={this.onExpireMonthChange}
									value={this.state.expireMonth}
								/>
							</View>

							<View style={styles.inputContainer}>
								<InputComponent
									options={{
										placeholder: 'Yıl',
										maxLength: 2,
										keyboardType: 'number-pad'
									}}
									invalid={
										this.state.invalidExpireYear && this.state.isExpireYearInitialized
									}
									onChange={this.onExpireYearChange}
									value={this.state.expireYear}
								/>
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
						this.state.invalidCardAlias || !this.state.isCardAliasInitialized
						|| this.state.invalidCardNumber || !this.state.isCardNumberInitialized
						|| this.state.invalidExpireYear || !this.state.isExpireYearInitialized
						|| this.state.invalidExpireMonth || !this.state.isExpireMonthInitialized
					}
				/>
			</ScrollView>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: 'space-between'
	},
	header: {
		flexDirection: 'row'
	},
	imageContainer: {
		margin: RFValue(10, 600),
		marginLeft: RFValue(12, 600)
	},
	caseImage: {
		width: RFValue(95, 600),
		height: RFValue(105, 600),
		borderRadius: 8
	},
	securityText: {
		color: 'rgba(0,0,0,.8)',
		fontSize: RFValue(19, 600),
		fontWeight: 'bold'
	},
	infoContainer: {
		flex: 1,
		flexDirection: 'column',
		margin: RFValue(10, 600),
		marginRight: RFValue(12, 600)
	},
	securityInformation: {
		color: '#757889',
		fontSize: RFValue(15, 600),
		fontWeight: 'bold'
	},
	row: {
		flexDirection: 'row'
	},
	inputContainer: {
		flex: 1
	},
	continueButton: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgb(94,63,190)',
		borderRadius: 10
	},
	continueText: {
		fontSize: RFValue(20, 600),
		color: 'white'
	},
	empty: {
		height: RFValue(22, 600)
	}
})

const mapStateToProps = ({
	reducer4: {
		user
	}
}) => ({
	user
})

const mapDispatchToProps = {
	saveCard
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCardScreen)
