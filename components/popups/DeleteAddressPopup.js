import React from 'react'
import { StyleSheet } from 'react-native'
import Modal, {
    ModalTitle,
    ModalButton,
    ModalFooter
} from 'react-native-modals'

const DeleteAddressPopup = ({ scaleAnimationModal, setPopupState }) => (
    <Modal
        onTouchOutside={() => {
            setPopupState({ scaleAnimationModal: false })
        }}
        width={0.9}
        visible={scaleAnimationModal}
        onSwipeOut={() => setPopupState({ scaleAnimationModal: false })}
        onHardwareBackPress={() => {
            setPopupState({ scaleAnimationModal: false })
            return true
        }}
        modalTitle={
            <ModalTitle
                style={styles.title}
                textStyle={styles.titleText}
                title='Are you sure you want to delete you address?'
                hasTitleBar={false} />
        }
        footer={
            <ModalFooter style={styles.footer}>
                <ModalButton
                    text='No'
                    textStyle={styles.buttonText}
                    style={styles.buttonNo}
                    onPress={() => {
                        setPopupState({ scaleAnimationModal: false })
                    }}
                    key='button-1' />
                <ModalButton
                    text='Yes'
                    textStyle={styles.buttonText}
                    style={styles.buttonYes}
                    onPress={() => {
                        setPopupState({ scaleAnimationModal: false }, true)
                    }}
                    key='button-2' />
            </ModalFooter>
        } />
)

const styles = StyleSheet.create({
    footer: { height: 42 },
    buttonNo: { backgroundColor: '#697488' },
    buttonYes: { backgroundColor: '#5D3EBD' },
    buttonText: { color: 'white' },
    title: { marginVertical: 8 },
    titleText: { textAlign: 'center' }
})

export default DeleteAddressPopup