import React from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { s } from 'react-native-size-matters'

class HeaderLeft extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (Object.values(nextProps.cart).length === 1 || Object.values(nextProps.cart).length === 0) {
            return true
        }

        return false
    }

    render() {
        if (Object.values(this.props.cart).length > 0) {
            return (
                <TouchableOpacity style={styles.backIcon} onPress={this.props.navigation.goBack}>
                    <Ionicons name="md-close" size={26} color="white" />
                </TouchableOpacity>
            )
        }
        return null
    }
}

const mapStateToProps = ({ cartReducer: { cart } }) => ({
    cart,
})

const styles = StyleSheet.create({
    backIcon: {
        marginLeft: s(18),
    },
})

export default connect(mapStateToProps)(HeaderLeft)
