import React from 'react'

import { View } from 'react-native'
import ShadowView from 'react-native-simple-shadow-view'
import { ScaledSheet } from 'react-native-size-matters'

import { COLORS } from '../scripts/colors'

const ShadowContainerHoc = (WrappedComponent, { containerStyle, style } = {}) => (
    class extends React.PureComponent {
        render() {
            return (
                <View style={[styles.x, containerStyle]}>
                    <View style={styles.y}>
                        <ShadowView style={[styles.z, style]}>
                            <WrappedComponent {...this.props} />
                        </ShadowView>
                    </View>
                </View>
            )
        }
    }
)

const styles = ScaledSheet.create({
    x: {
        flexGrow: 1,
        backgroundColor: COLORS.GRAY
    },
    y: {
        flexGrow: 1,
        flexDirection: 'row',
        overflow: 'hidden',
        paddingBottom: 4
    },
    z: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.LIGHT,
        shadowColor: COLORS.PRIMARY,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 24,
        elevation: 5
    }
})

export default ShadowContainerHoc
