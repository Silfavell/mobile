import React from 'react'

import { TouchableOpacity, StyleSheet } from 'react-native'
import { s } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { setClearCartPopupState } from '../../actions/global-actions'
import { COLORS } from '../../scripts/colors'

class HeaderRight extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (Object.values(nextProps.cart).length === 1 || Object.values(nextProps.cart).length === 0) {
            return true
        }

        return false
    }

    onClearClick = () => {
        this.props.setClearCartPopupState(true)
    }

    render() {
        if (Object.values(this.props.cart).length > 0) {
            return (
                <TouchableOpacity style={styles.iconContainer} onPress={this.onClearClick}>
                    <Ionicons name='md-trash' size={26} color={COLORS.LIGHT} />
                </TouchableOpacity>
            )
        }

        return null
    }
}

const mapStateToProps = ({ cartReducer: { cart } }) => ({
    cart
})

const mapDispatchToProps = {
    setClearCartPopupState
}

const styles = StyleSheet.create({
    iconContainer: {
        marginRight: s(18)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderRight)
