import React from 'react'
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize'
import {
	TouchableOpacity,
	View,
	Text,
	Image,
	StyleSheet,
	ImageBackground
} from 'react-native'
import { connect } from 'react-redux'
import { SERVER_URL } from '../utils/global'

import { setSelectedCategory } from '../actions/actions3'

const Category = ({
	data: {
		imagePath,
		name
	},
	index,
	navigation,
	// eslint-disable-next-line no-shadow
	setSelectedCategory
}) => {
	// const imageUrl = `${SERVER_URL}/assets/categories-2/${imagePath}.jpg` // TODO
	const imageUrl = 'https://img-kotonw.mncdn.com/static/images/10568566603806/1366tshirt-kadin-desktop-110520.jpg'

	const onCategoryClick = () => {
		setSelectedCategory(index)
		navigation.navigate('products')
	}

	return (
		<TouchableOpacity onPress={onCategoryClick} activeOpacity={0.9}>
			<ImageBackground
				source={{ uri: imageUrl }}
				resizeMode={'cover'}
				style={styles.container}>
				<Text style={styles.name}>{name}</Text>
			</ImageBackground>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 160,
		marginVertical: 20,
		marginHorizontal: 10,
		borderColor: '#CDCDCD'
	},
	name: {
		position: 'absolute',
		lineHeight: 24,
		fontSize: 18,
		bottom: -18,
		alignSelf: 'center',
		backgroundColor: 'white',
		color: 'black',
		borderWidth: 1,
		borderColor: 'black',
		paddingHorizontal: 18,
		paddingVertical: 4
	}
})

const mapDispatchToProps = {
	setSelectedCategory
}

export default connect(null, mapDispatchToProps)(Category)
