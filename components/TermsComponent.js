import React from 'react'
import {
	View,
	CheckBox,
	Text
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

const TermsComponent = () => (
	<View style={styles.container}>
		<View style={styles.checkBoxContainer}>
			<CheckBox style={styles.checkBox} />
		</View>
		<View style={styles.termsInfoContainer}>
			<View style={styles.termsTextContainer}>
				<Text style={styles.termsText}>I have read and accept </Text>
				<Text style={styles.termsLinkText}>the Terms and</Text>
			</View>
			<View style={styles.termsTextContainer}>
				<Text style={styles.termsLinkText}>Conditions.</Text>
			</View>
		</View>
	</View>
)

const styles = ScaledSheet.create({
	container: {
		height: '60@s',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		margin: '3@s',
		marginVertical: '8@s',
	},
	checkBoxContainer: {
		alignItems: 'flex-start',
		justifyContent: 'flex-start'
	},
	checkBox: {
		backgroundColor: 'transparent'
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
	}
})

export default TermsComponent
