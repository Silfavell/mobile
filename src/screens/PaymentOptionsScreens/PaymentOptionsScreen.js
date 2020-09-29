import React from 'react'
import { connect } from 'react-redux'
import {FlatList} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import DeleteCardPopup from '../../components/popups/DeleteCardPopup'
import CardComponent from '../../components/CardComponent'
import AddNewCardComponent from '../../components/AddNewCardComponent'
import ShadowContainer from '../../components/ShadowContainer'

import { deleteCard } from '../../actions/actions2'

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
