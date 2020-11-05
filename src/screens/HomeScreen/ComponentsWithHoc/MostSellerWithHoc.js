import React from 'react'
import { View, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import ShadowContainerHoc from '../../../components/ShadowContainerHoc'

const MostSellerWithHoc = () => {
    return (
        <View style={styles.dividerChild}>
			<Text style={styles.dividerTitle}>En Çok Satanlar</Text>
		</View>
    )
}

const styles = ScaledSheet.create({
	dividerChild: {
		height: '100%',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row'
	},
	dividerTitle: {
		color: 'black',
		fontSize: '17@s',
		fontWeight: '600',
		paddingHorizontal: '16@s'
	},
	shadowContainer: {
		backgroundColor: 'white'
	}
})

export default ShadowContainerHoc(MostSellerWithHoc, { style: styles.shadowContainer})