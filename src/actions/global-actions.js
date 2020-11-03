export const CLEAR_CART_POPUP_STATE = 'CLEAR_CART_POPUP_STATE'
export const SET_CONNECTION_POPUP_STATE = 'SET_CONNECTION_POPUP_STATE'
export const NEED_TO_LOGIN_POPUP_STATE = 'NEED_TO_LOGIN_POPUP_STATE'
export const SET_ROOT_NAVIGATION = 'SET_ROOT_NAVIGATION'
export const SET_NEED_UPDATE_POPUP_STATE = 'SET_NEED_UPDATE_POPUP_STATE'
export const SET_MESSAGE_POPUP_REF = 'SET_MESSAGE_POPUP_REF'

export const setMessagePopupRef = (messagePopupRef) => (dispatch) => {
    dispatch({
        type: SET_MESSAGE_POPUP_REF,
        payload: {
            messagePopupRef
        }
    })
}

export const setRootNavigation = (navigation) => (dispatch) => {
    dispatch({
        type: SET_ROOT_NAVIGATION,
        payload: {
            navigation
        }
    })
}

export const setNeedToLoginPopupState = (needToLoginPopupState) => (dispatch) => {
    dispatch({
        type: NEED_TO_LOGIN_POPUP_STATE,
        payload: {
            needToLoginPopupState
        }
    })
}

export const setClearCartPopupState = (clearCartPopupState) => (dispatch) => {
    dispatch({
        type: CLEAR_CART_POPUP_STATE,
        payload: {
            clearCartPopupState
        }
    })
}
