import React from 'react'

import {FlatList} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { connect } from 'react-redux'

import { deleteCard } from '../../actions/payment-actions'
import DeleteCardPopup from '../../components/popups/DeleteCardPopup'
import ShadowContainer from '../../components/ShadowContainer'
import AddNewCardComponent from './AddNewCardComponent'
import CardComponent from './CardComponent'


class PaymentOptionsScreen extends React.Component {
	state = {
	    scaleAnimationModal: false,
	    selectedCard: null
	}

	renderCardComponent = ({ item }) => (
	    <CardComponent
	        item={item}
	        setPopupState={this.setPopupState}
	        navigation={this.props.navigation}
	    />
	)

	setPopupState = (result, confirm) => {
	    this.setState({
	        scaleAnimationModal: result.scaleAnimationModal,
	        selectedCard: result.selectedCard
	    })

	    if (confirm) {
	        this.props.deleteCard(this.state.selectedCard)
	    }
	}

	renderListFooter = () => <AddNewCardComponent navigation={this.props.navigation} />

	render() {
	    return (
	        <ShadowContainer>

	            <DeleteCardPopup scaleAnimationModal={this.state.scaleAnimationModal} setPopupState={this.setPopupState} />

	            <FlatList
	                contentContainerStyle={styles.list}
	                data={this.props.cards}
	                keyExtractor={(item) => item.cardToken}
	                renderItem={this.renderCardComponent}
	                ListFooterComponent={this.renderListFooter}
	            />

	        </ShadowContainer>
	    )
	}
}

const styles = ScaledSheet.create({
    list: { backgroundColor: 'white' }
})

const mapStateToProps = ({
    paymentReducer: {
        cards
    }
}) => ({
    cards
})

const mapDispacthToProps = {
    deleteCard
}

export default connect(mapStateToProps, mapDispacthToProps)(PaymentOptionsScreen)
