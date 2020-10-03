import React from 'react'

import ConnectionPopup from '../../components/popups/ConnectionPopup'
import NeedToLoginPopup from '../../components/popups/NeedToLoginPopup'
import ClearCartPopup from '../../components/popups/ClearCartPopup'
import GlobalMessagePopup from '../../components/popups/GlobalMessagePopup'
import NeedUpdatePopup from '../../components/popups/NeedUpdatePopup'

const GlobalScreen = () => (
	<>
		<ConnectionPopup />
		<NeedToLoginPopup />
		<ClearCartPopup />
		<GlobalMessagePopup />
		<NeedUpdatePopup />
	</>
)

export default GlobalScreen
