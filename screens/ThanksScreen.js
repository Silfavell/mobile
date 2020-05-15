import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ThanksScreen = ({ navigation }) => (
	<View style={styles.emptyCartContainer}>
		<View style={styles.child} />
		<View style={styles.child} />
		<View style={styles.child} />
		<View style={styles.child}>
			<Ionicons name="md-basket" size={96} color="#BDBDBD" />
		</View>
		<View style={styles.child} />
		<View style={styles.child}>
			<Text style={styles.orderCompletedText}>Siparişiniz alınmıştır.</Text>
		</View>
		<View style={styles.child} />
		<View style={[styles.child, styles.goToHomeButtonContainer]}>
			<TouchableOpacity
				onPress={() => {
					navigation.popToTop()
					navigation.navigate('home')
				}}
				style={styles.goToHomeButton}
			>
				<Text style={styles.goToHomeButtonText}>ANASAYFAYA GİT</Text>
			</TouchableOpacity>
		</View>
		<View style={styles.child} />
		<View style={styles.child} />
		<View style={styles.child} />
	</View>
)

const styles = StyleSheet.create({
	emptyCartContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#EDEDED'
	},
	child: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	orderCompletedText: {
		fontSize: RFValue(22, 600),
		textAlign: 'center'
	},
	goToHomeButtonContainer: {
		display: 'flex'
	},
	goToHomeButton: {
		backgroundColor: '#4CAB51',
		borderRadius: 32,
		alignItems: 'center',
		justifyContent: 'center',
		margin: RFValue(18, 600),
		padding: RFValue(18, 600),
		paddingHorizontal: RFValue(48, 600)
	},
	goToHomeButtonText: {
		color: 'white',
		fontSize: RFValue(20, 600),
		alignItems: 'center',
		justifyContent: 'center'
	}
})

export default ThanksScreen
