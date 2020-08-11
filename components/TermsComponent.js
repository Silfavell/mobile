import React from 'react'
import {
	View,
	Text
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CheckBox from 'react-native-check-box'

const TermsComponent = () => (
	<View style={styles.container}>
		<View style={styles.checkBoxContainer}>
			<CheckBox
				style={{ height: 24 }}
				checkedImage={<MaterialIcons name={'check'} size={24} color={'black'} />}
				unCheckedImage={<MaterialIcons name={'check-box-outline-blank'} size={24} color={'black'} />}
				onClick={() => { }}
				isChecked={true}
			/>
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
	}
})

export default TermsComponent
