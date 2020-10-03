import React from 'react'
import { connect } from 'react-redux'

import RecyclerList from './List'

class BestSeller extends React.PureComponent {
    render() {
        return (
            <RecyclerList
                navigation={this.props.navigation}
                list={this.props.bestSeller}
                headers={this.props.headers}
            />
        )
    }
}

const mapStateToProps = ({
    sourceReducer: {
        bestSeller
    }
}) => ({
    bestSeller
})

export default connect(mapStateToProps)(BestSeller)