import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import {
    Text,
    Platform
} from 'react-native'
import { connect } from 'react-redux'
import {
    Container,
    Tab,
    Tabs,
    ScrollableTab,
    TabHeading
} from 'native-base'

import RecyclerList from '../RecyclerList'

class BestSeller extends React.Component {

    getTabBar = () => <ScrollableTab />

    renderTab = (category) => (
        <Tab
            key={category._id + 'bestSeller'}
            heading={
                <TabHeading style={styles.tabStyle}>
                    <Text style={styles.tabBarTextStyle}>{category.name}</Text>
                </TabHeading>
            }>

            <RecyclerList
                navigation={this.props.navigation}
                tabLabel={category.name}
                list={category.products}
            />
        </Tab>
    )

    render() {
        return (
            <Container>
                <Tabs
                    tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                    prerenderingSiblingsNumber={Infinity}
                    tabBarBackgroundColor={styles.tabStyle.backgroundColor}
                    renderTabBar={this.getTabBar}
                >
                    {
                        this.props.bestSeller.map(this.renderTab)
                    }
                </Tabs>
            </Container>
        )
    }
}

const styles = ScaledSheet.create({
    tabBarTextStyle: {
        fontSize: '15@s',
        fontFamily: Platform.OS === 'ios' ? 'Moon-Bold' : 'MoonBold',
        color: 'rgba(0,0,0,.8)'
    },
    tabBarUnderlineStyle: {
        backgroundColor: '#FED110',
        height: 3
    },
    tabStyle: {
        backgroundColor: 'white'
    }
})

const mapStateToProps = ({
    reducer4: {
        bestSeller
    }
}) => ({
    bestSeller
})

export default connect(mapStateToProps)(BestSeller)