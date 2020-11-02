import React from 'react'

import ViewPager from '@react-native-community/viewpager'
import { View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

class CarouselViewer extends React.Component {
  state = {
      current: 0,
  };

  componentDidMount() {
      if (this.props.loop) {
          this.interval = setInterval(() => {
              if (this.state.current === 3) {
                  this.viewPager.setPage(0)
                  this.setState({ current: 0 })
              } else {
                  this.viewPager.setPage(this.state.current + 1)
                  this.setState({ current: this.state.current + 1 })
              }
          }, 5000)
      }
  }

  componentWillUnmount() {
      if (this.props.loop) {
          clearInterval(this.interval)
      }
  }

  onPageSelected = (event) => {
      const current = event.nativeEvent.position
      if (this.state.current !== current) {
          this.setState({ current })
      }
  };

  setViewPagerRef = (ref) => {
      this.viewPager = ref
  };

  render() {
      return (
          <View style={styles.container}>
              <ViewPager
                  ref={this.setViewPagerRef}
                  style={styles.viewPager}
                  initialPage={0}
                  onPageSelected={this.onPageSelected}
                  {...this.props}
              />

              {this.props.paginator && this.props.images.length > 1 && (
                  <View style={styles.paginator}>
                      <View style={styles.dotContainer}>
                          {this.props.children.map((item, i) => (
                              <View
                                  key={'slide' + i.toString()}
                                  style={[
                                      styles.dot,
                                      { backgroundColor: this.state.current === i ? 'black' : 'white' },
                                  ]}
                              />
                          ))}
                      </View>
                  </View>
              )}
          </View>
      )
  }
}

const styles = ScaledSheet.create({
    container: {
        height: '100%',
    },
    viewPager: {
        flex: 1,
    },
    paginator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dotContainer: {
        zIndex: 1000,
        opacity: 0.8,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    dot: {
        width: 20,
        height: 4,
        backgroundColor: 'white',
        marginHorizontal: 3,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#CDCDCD',
    },
})

export default CarouselViewer
