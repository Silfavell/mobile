import React from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import SettingItem from './SettingItem'
import LogoutPopup from './popups/LogoutPopup'

class LogoutItem extends React.PureComponent {

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
            <React.Fragment>
            
                <LogoutPopup scaleAnimationModal={this.state.scaleAnimationModal} setPopupState={this.setPopupState} />

                <TouchableOpacity onPress={this.onClick}>
                    <SettingItem title={'Logout'}>
                        <MaterialIcons color={'#4522A0'} name={'exit-to-app'} size={32} />
                    </SettingItem>
                </TouchableOpacity>

            </React.Fragment>
        )
    }
}

export default LogoutItem