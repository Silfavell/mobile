import React from 'react'
import {
	View, CheckBox, Text, StyleSheet,
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

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

const styles = StyleSheet.create({
	container: {
		height: RFValue(60, 600), flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', margin: RFValue(3, 600), marginVertical: RFValue(8, 600),
	},
	checkBoxContainer: { alignItems: 'flex-start', justifyContent: 'flex-start' },
	checkBox: { backgroundColor: 'transparent' },
	termsText: { color: 'black', fontSize: RFValue(16, 600), fontWeight: 'bold' },
	termsLinkText: { color: '#D000DB', fontSize: RFValue(16, 600), fontWeight: 'bold' },
	termsTextContainer: { alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
	termsInfoContainer: {
		alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', marginLeft: RFValue(8, 600),
	},
})

export default TermsComponent
