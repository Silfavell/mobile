import React from 'react'

import CompletePayment from '../../components/CompletePayment'
import CompletePaymentContent from './CompletePaymentContent'

class CompletePaymentScreen extends React.PureComponent {
    render() {
        return (
            <>
                <CompletePaymentContent {...this.props} />
                <CompletePayment
                    completable
                    navigation={this.props.navigation} />
            </>
        )
    }
}

export default CompletePaymentScreen
