import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import {
	View,
	Image,
	Text,
	StyleSheet
} from 'react-native'

import loadingGif from '../assets/icon-black.png'

const LoadingComponent = () => (
	<View style={styles.container}>
		<View style={styles.center}>
			<Image style={{ height: RFValue(300, 600), aspectRatio: 1 }} source={loadingGif} />
			<Text style={styles.text}>Lütfen bekleyin..</Text>
		</View>
	</View>
)

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		display: 'flex',
		flex: 1
	},
	center: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column'
	},
	text: {
		fontSize: RFValue(28, 600),
		paddingVertical: RFValue(30, 600),
		fontWeight: 'bold',
		color: 'rgba(0,0,0,.8)'
	}
})

export default LoadingComponent
