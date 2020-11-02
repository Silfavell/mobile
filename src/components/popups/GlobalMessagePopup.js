import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import { ScaledSheet } from 'react-native-size-matters'

import { setMessagePopupRef } from '../../actions/global-actions'

class GlobalMessagePopup extends React.PureComponent {
  messageComponent = (source) => (
      <View style={styles.container}>
          <View style={styles.titleContainer}>
              <Text numberOfLines={3} style={styles.title}>
                  {source.message.message}
              </Text>
          </View>
      </View>
  );

  horizontalTransition = (animValue) => {
      const opacity = animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
      })

      const translateX = animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
      })

      return {
          transform: [{ translateX }],
          opacity,
      }
  };

  render() {
      return (
          <View pointerEvents="none" style={styles.absoluteContainer}>
              <FlashMessage
                  ref={this.props.setMessagePopupRef}
                  animationDuration={250}
                  duration={2000}
                  position={'bottom'}
                  transitionConfig={this.horizontalTransition}
                  MessageComponent={this.messageComponent}
              />
          </View>
      )
  }
}

const styles = ScaledSheet.create({
    absoluteContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1000,
        elevation: 0.01,
        marginVertical: 100,
    },
    container: {
        flex: 1,
        margin: '12@s',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#EFEFEF',
        borderBottomWidth: 1,
        borderBottomColor: '#EE4266',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: '18@s',
        backgroundColor: 'white',
    },
    title: {
        fontSize: '18@s',
    },
})

const mapDispatchToProps = {
    setMessagePopupRef,
}

export default connect(null, mapDispatchToProps)(GlobalMessagePopup)
