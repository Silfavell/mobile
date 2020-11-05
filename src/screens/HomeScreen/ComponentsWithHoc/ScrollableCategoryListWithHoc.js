import React from 'react'

import ScrollableCategoryList from '../../../components/ScrollableCategoryList'
import ShadowContainerHoc from '../../../components/ShadowContainerHoc'

const ScrollableCategoryListWithHoc = (props) => {
    return <ScrollableCategoryList {...props} />
}

export default ShadowContainerHoc(ScrollableCategoryListWithHoc)