import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import {
	View,
	Image,
	Text
} from 'react-native'

import loadingGif from '../assets/icon-black.png'

const LoadingComponent = () => (
	<View style={styles.container}>
		<View style={styles.center}>
			<Image style={styles.image} source={loadingGif} />
			<Text style={styles.text}>Lütfen Bekleyin</Text>
		</View>
	</View>
)

const styles = ScaledSheet.create({
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
		fontSize: '28@s',
		paddingVertical: '30@s',
		fontWeight: 'bold',
		color: 'rgba(0,0,0,.8)'
	},
	image: {
		height: '300@s',
		aspectRatio: 1
	}
})

export default LoadingComponent