import React from 'react'

import Slider from '../../../components/Slider'
import ShadowContainerHoc from '../../../components/ShadowContainerHoc'

const SliderWithHoc = (props) => {
    return <Slider {...props} />
}

export default ShadowContainerHoc(SliderWithHoc)