import React from 'react'
import { View, StyleSheet } from 'react-native'

class ShadowContainer extends React.PureComponent {
	render() {
		return (
			<View style={[styles.x, this.props.containerStyle]}>
				<View style={styles.y}>
					<View style={[styles.z, this.props.style]}>
						{this.props.children}
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	x: {
		flexGrow: 1,
		backgroundColor: '#DFDFDF'
	},
	y: {
		flexDirection: 'row',
		overflow: 'hidden',
		paddingBottom: 4
	},
	z: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#EDEDED',
		shadowColor: '#000',
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 24,
		elevation: 3
	}
})

export default ShadowContainer
