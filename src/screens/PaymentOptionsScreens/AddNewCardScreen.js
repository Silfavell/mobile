import React from 'react'
import { connect } from 'react-redux'
import {
	ScrollView,
	View,
	Image,
	Text
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import joi from 'react-native-joi'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { saveCard } from '../../actions/actions2'

import ButtonComponent from '../../components/ButtonComponent'
import InputComponent from '../../components/InputComponent'

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
			cardNumber: cardNumber.split(' ').join(''),
			expireYear,
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
			.validate(cardNumber.split(' ').join(''), (err) => {
				this.setState({ cardNumber, isCardNumberInitialized: true, invalidCardNumber: !!err })
			})
	}

	onExpireMonthChange = ({ label }) => {
		this.setState({ expireMonth: label, isExpireMonthInitialized: true })
	}

	onExpireYearChange = ({ label }) => {
		this.setState({ expireYear: label, isExpireYearInitialized: true })
	}

	getYearSelectorValues = () => {
		const years = Array.from(new Array(20)).map((_, index) => {
			return {
				key: 'year' + index,
				label: (new Date().getFullYear() + index).toString()
			}
		})

		return years
	}

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<View>
					<View style={styles.header}>

						<View style={styles.imageContainer}>
							<Ionicons color='rgba(0,0,0,.8)' name='ios-card' size={95} />
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
									Kredi kartı bilgileriniz Silfavell tarafından tutulmamaktadır ödeme altyapısı Iyzico tarafından sağlanmaktadır.
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
								maxLength: 19,
								keyboardType: 'number-pad'
							}}
							invalid={
								this.state.invalidCardNumber && this.state.isCardNumberInitialized
							}
							mask={'card'}
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
									value={this.state.expireMonth}
								/>
							</View>

							<View style={styles.inputContainer}>
								<InputComponent
									options={{
										placeholder: 'Yıl',
										keyboardType: 'number-pad'
									}}
									invalid={
										this.state.invalidExpireYear && this.state.isExpireYearInitialized
									}
									selector={
										this.getYearSelectorValues()
									}
									setPickedValue={this.onExpireYearChange}
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
const styles = ScaledSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: 'space-between'
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
		color: 'rgba(0,0,0,.8)',
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
		color: '#757889',
		fontSize: '15@s',
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
		fontSize: '20@s',
		color: 'white'
	},
	empty: {
		height: '22@s'
	}
})

const mapStateToProps = ({
	sourceReducer: {
		user
	}
}) => ({
	user
})

const mapDispatchToProps = {
	saveCard
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCardScreen)
