import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import {
	View,
	TouchableOpacity,
	Text
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ThanksScreen = ({ navigation }) => (
	<View style={styles.emptyCartContainer}>
		<View style={styles.child} />
		<View style={styles.child} />
		<View style={styles.child} />
		<View style={styles.child} />
		<View style={styles.child}>
			<Ionicons name='md-checkmark-circle-outline' size={96} color='#4CAB51' />
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
				<Text style={styles.goToHomeButtonText}>Ana Sayfaya Git</Text>
			</TouchableOpacity>
		</View>
		<View style={styles.child} />
		<View style={styles.child} />
		<View style={styles.child} />
		<View style={styles.child} />
	</View>
)

const styles = ScaledSheet.create({
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
		fontSize: '22@s',
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
		margin: '18@s',
		padding: '18@s',
		paddingHorizontal: '48@s'
	},
	goToHomeButtonText: {
		color: 'white',
		fontSize: '20@s',
		alignItems: 'center',
		justifyContent: 'center'
	}
})

export default ThanksScreen
