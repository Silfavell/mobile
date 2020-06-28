import React from 'react'
import ViewPager from '@react-native-community/viewpager'
import { View, StyleSheet } from 'react-native'

class CarouselViewer extends React.Component {
  state = {
    current: 0
  }

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
    const current = event.nativeEvent.position;
    if (this.state.current !== current) {
      this.setState({ current })
    }
  }

  setViewPagerRef = (ref) => {
    this.viewPager = ref
  }

  render() {
    return (
      <View style={styles.container}>
        <ViewPager
          ref={this.setViewPagerRef}
          style={styles.viewPager}
          onPageSelected={this.onPageSelected}
          {...this.props}
        />

        {
          this.props.paginator && (
            <View style={styles.paginator}>
              <View style={styles.dotContainer}>
                {
                  this.props.children.map((item, i) => (
                    <View key={'slide' + i.toString()} style={[styles.dot, { backgroundColor: this.state.current === i ? 'white' : 'grey' }]} />
                  ))
                }
              </View>
            </View>
          )
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  viewPager: {
    flex: 1
  },
  paginator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dotContainer: {
    zIndex: 1000,
    opacity: 0.8,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  dot: {
    width: 20,
    height: 3,
    backgroundColor: 'white',
    marginHorizontal: 3,
    marginVertical: 6
  }
})

export default CarouselViewer
