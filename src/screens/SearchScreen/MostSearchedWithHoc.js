import React from 'react'

import { View, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import ShadowContainerHoc from '../../components/ShadowContainerHoc/ShadowContainerHoc'
import { COLORS } from '../../scripts/colors'

const MostSellerWithHoc = () => (
    <View style={styles.dividerChild}>
        <Text style={styles.dividerTitle}>En Çok Arananlar</Text>
    </View>
)

const styles = ScaledSheet.create({
    dividerChild: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    },
    dividerTitle: {
        color: COLORS.DARK,
        fontSize: '17@s',
        fontWeight: '600',
        paddingHorizontal: '16@s'
    },
    shadowContainer: {
        backgroundColor: COLORS.LIGHT
    }
})

export default ShadowContainerHoc(MostSellerWithHoc, { style: styles.shadowContainer })
