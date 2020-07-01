import React from 'react'
import { TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import SettingItem from './SettingItem'
import LogoutPopup from './popups/LogoutPopup'

class LogoutItem extends React.PureComponent {
	state = {
		scaleAnimationModal: false,
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

				<LogoutPopup scaleAnimationModal={this.state.scaleAnimationModal} setPopupState={this.setPopupState} />

				<TouchableOpacity onPress={this.onClick}>
					<SettingItem title="Çıkış Yap">
						<MaterialIcons color="rgba(0,0,0,.8)" name="exit-to-app" size={32} />
					</SettingItem>
				</TouchableOpacity>

			</>
		)
	}
}

export default LogoutItem
