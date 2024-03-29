import React from 'react'

import {
    View
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import ShadowContainerHoc from '../../components/ShadowContainerHoc/ShadowContainerHoc'
import Slider from '../../components/Slider/Slider'
import { COLORS } from '../../scripts/colors'

const SliderWithHoc = ({ _id, images }) => (
    <View style={styles.imageContainer}>
        <Slider
            imageContainerStyle={styles.imageContainerStyle}
            _id={_id}
            images={images}
            shopSingle
            paginator />
    </View>
)

const styles = ScaledSheet.create({
    imageContainer: {
        flex: 1,
        height: '260@s'
    },
    shadowContainer: {
        backgroundColor: COLORS.LIGHT
    },
    imageContainerStyle: {
        paddingBottom: 20
    }
})

export default ShadowContainerHoc(SliderWithHoc, { style: styles.shadowContainer })
