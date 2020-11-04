import React from 'react'
import { View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

const ShadowContainerHoc = (WrappedComponent, { containerStyle, style } = {}) => (
	class extends React.Component {
		render(){
			return (
				<View style={[styles.x, containerStyle]}>
					<View style={styles.y}>
						<View style={[styles.z, style]}>
							<WrappedComponent {...this.props} />
						</View>
					</View>
				</View>
			)
		}
	}
)

const styles = ScaledSheet.create({
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

export default ShadowContainerHoc
