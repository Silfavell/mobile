import React from 'react'

import { TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

import { logout } from '../../actions/source-actions'
import AskPopup from '../../components/popups/AskPopup'
import SettingItem from '../../components/SettingItem'
import { COLORS } from '../../scripts/colors'

class LogoutItem extends React.Component {
    state = {
        scaleAnimationModal: false
    }

    setPopupState = (state) => {
        this.setState(state)
    }

    onClick = () => {
        this.setState({ scaleAnimationModal: true })
    }

    render() {
        return (
            <>
                <AskPopup
                    func={this.props.logout}
                    title='Çıkış yapmak istediğinize emin misiniz ?'
                    scaleAnimationModal={this.state.scaleAnimationModal}
                    setPopupState={this.setPopupState} />

                <TouchableOpacity onPress={this.onClick}>
                    <SettingItem title='Çıkış Yap'>
                        <MaterialIcons color={COLORS.TERTIARY} name='exit-to-app' size={32} />
                    </SettingItem>
                </TouchableOpacity>
            </>
        )
    }
}

const mapDispatchToProps = {
    logout
}

export default connect(null, mapDispatchToProps)(LogoutItem)
