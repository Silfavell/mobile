import React from 'react'

import ShadowContainerHoc from '../../../components/ShadowContainerHoc'
import Slider from '../../../components/Slider'

const SliderWithHoc = (props) => <Slider {...props} />

export default ShadowContainerHoc(SliderWithHoc)
