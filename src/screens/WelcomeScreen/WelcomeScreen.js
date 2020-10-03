import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import {
	View,
	TouchableOpacity,
	Text,
	Image
} from 'react-native'

import ButtonComponent from '../../components/ButtonComponent'

import icon from '../../../assets/logo.png'

class WelcomeScreen extends React.PureComponent {
	onContinueClick = () => {
		this.props.navigation.navigate('Loading', { next: true })
	}

	onRegisterClick = () => {
		this.props.navigation.navigate('register')
	}

	onLoginClick = () => {
		this.props.navigation.navigate('login')
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.empty} />
				<View style={styles.child} />

				<View style={[styles.child, styles.imageContainer]}>
					<Image
						style={styles.image}
						resizeMode='contain'
						resizeMethod='resize'
						source={icon} />
				</View>

				<View style={styles.empty} />

				<View style={styles.child}>
					<TouchableOpacity
						style={styles.continueWithRegistration}
						onPress={this.onContinueClick}>
						<Text style={styles.buttonText}>Giriş yapmadan devam et</Text>
					</TouchableOpacity>
				</View>

				<ButtonComponent
					text='Kayıt Ol'
					onClick={this.onRegisterClick}
				/>

				<View style={styles.child}>
					<TouchableOpacity style={styles.goToLoginPageContainer} onPress={this.onLoginClick}>
						<Text style={styles.buttonText}>Hesabın var mı ?</Text>
						<Text style={styles.loginText}>Giriş yap</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = ScaledSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	empty: {
		flex: 0.9
	},
	imageContainer: {
		flex: 4.2,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	image: {
		flex: 1,
		borderWidth: 1,
		height: '90%'
	},
	child: {
		flex: 1,
		margin: '5@s'
	},
	continueWithRegistration: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonText: {
		color: '#6E7586',
		fontSize: '20@s'
	},
	goToLoginPageContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	loginText: {
		color: 'rgba(0,0,0,.8)',
		fontSize: '18@s',
		marginHorizontal: '10@s'
	}
})

export default WelcomeScreen