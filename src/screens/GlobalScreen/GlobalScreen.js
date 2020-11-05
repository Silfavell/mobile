import React from 'react'

import ClearCartPopup from '../../components/popups/ClearCartPopup'
import ConnectionPopup from '../../components/popups/ConnectionPopup'
import GlobalMessagePopup from '../../components/popups/GlobalMessagePopup'
import NeedToLoginPopup from '../../components/popups/NeedToLoginPopup'
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
