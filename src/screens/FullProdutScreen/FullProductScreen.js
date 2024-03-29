import React from 'react'

import {
    ScrollView, TouchableOpacity, View, Text
} from 'react-native'
import Config from 'react-native-config'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { increaseProductQuantity } from '../../actions/cart-actions'
import { addToFavoriteProducts, removeFromFavoriteProdutcs } from '../../actions/source-actions'
import Accordion from '../../components/Accordion/Accordion'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { COLORS } from '../../scripts/colors'
import { getProductBySlug as getProductBySlugRequest } from '../../scripts/requests'
import Loading from '../LoadingScreen/LoadingScreen'
import Color from './Color'
import Comment from './Comment'
import SliderWithHoc from './SliderWithHoc'
import Specification from './Specification'

class FullProductScreen extends React.Component {
    scrollRef = React.createRef()

    state = {
        product: null,
        pickedColor: -1
    }

    componentDidMount() {
        this.getProductBySlug(this.props.route.params.slug)
    }

    // TODO replace with another lifecycle method
    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps() {
        if (this.state.pickedColor === -1) {
            this.setHeader(this.state.product._id)
        } else {
            this.setHeader(this.state.product.group[this.state.pickedColor]._id)
        }
    }

    onHeartClick = (_id) => {
        if (this.props.user?.favoriteProducts?.includes(_id)) {
            this.removeFromFavoriteProdutcs(_id, this.props.messagePopupRef)
        } else {
            this.addToFavoriteProducts(_id, this.props.messagePopupRef)
        }
    }

    setHeader = (_id) => {
        if (this.props.token) {
            this.props.navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity onPress={() => this.onHeartClick(_id)}>
                        <Ionicons
                            size={26}
                            color={COLORS.PRIMARY}
                            style={styles.iconStyle}
                            name={this.props.user?.favoriteProducts?.includes(_id) ? 'md-heart' : 'md-heart-empty'} />
                    </TouchableOpacity>
                )
            })
        }
    }

    onAddToCartClick = () => {
        if (this.state.pickedColor === -1) {
            this.props.increaseProductQuantity(this.state.product._id, this.props.messagePopupRef)
        } else {
            this.props.increaseProductQuantity(this.state.product.group[this.state.pickedColor]._id, this.props.messagePopupRef)
        }
    }

    addToFavoriteProducts = (_id) => {
        this.props.addToFavoriteProducts(_id, this.props.messagePopupRef)
    }

    removeFromFavoriteProdutcs = (_id) => {
        this.props.removeFromFavoriteProdutcs(_id, this.props.messagePopupRef)
    }

    getProductBySlug = async (productSlug) => {
        const fromSearch = !!this.props.route.params.fromSearch
        const { status, data } = await getProductBySlugRequest(productSlug, fromSearch)

        if (status === 200) {
            this.setState({
                product: data,
                pickedColor: -1
            }, () => {
                this.scrollRef.current.scrollTo({ y: 0, animated: true })
                this.setHeader(data._id)
            })
        }
    }

    onColorPicked = (colorIndex) => {
        this.setState({ pickedColor: colorIndex }, () => {
            this.setHeader(this.state.product.group[colorIndex]._id)
        })
    }

    getImages = () => {
        const {
            slug,
            imageCount
        } = this.state.pickedColor === -1 ? this.state.product : this.state.product.group[this.state.pickedColor]

        return Array.from(new Array(imageCount)).map((_, index) => `${Config.SERVER_URL}/assets/products/${slug}_${index}_940x940.webp`)
    }

    isColorSelected = (index) => {
        if (this.state.pickedColor === -1) {
            const productIndexInGroup = this.state.product.group.find((product) => product._id === this.state.product._id)

            return this.state.product.group.indexOf(productIndexInGroup) === index
        }

        return index === this.state.pickedColor
    }

    render() {
        if (this.state.product) {
            const {
                name,
                details,
                price,
                discountedPrice,
                color,
                specifications
            } = this.state.pickedColor === -1 ? this.state.product : this.state.product.group[this.state.pickedColor]

            const { comments } = this.state.product

            return (
                <View style={styles.container}>

                    <ScrollView
                        ref={this.scrollRef}
                        contentContainerStyle={styles.scrollContainer}
                        onScroll={this.handleScroll}>
                        <SliderWithHoc
                            _id={`Slider:${(this.state.pickedColor === -1 ? this.state.product : this.state.product.group[this.state.pickedColor])._id}`}
                            images={this.getImages()} />

                        <View style={styles.details}>
                            <View style={styles.textContainer}>
                                <Text style={styles.productName}>{name}</Text>
                            </View>

                            <View style={styles.priceContainer}>
                                <Text style={[styles.price, discountedPrice ? styles.discountedPrice : {}]}>{`₺${price.toFixed(2).toString().replace('.', ',')}`}</Text>

                                {
                                    discountedPrice && (
                                        <Text style={styles.price}>{`₺${discountedPrice.toFixed(2).toString().replace('.', ',')}`}</Text>
                                    )
                                }
                            </View>
                        </View>

                        {
                            (this.state.product.group && this.state.product.group.length > 1 && color) && (
                                <View style={styles.colorContainer}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.colorText}>
                                            {'Renk:    '}
                                            <Text style={styles.colorName}>{color.name}</Text>
                                        </Text>
                                    </View>

                                    <View style={styles.colors}>

                                        {
                                            this.state.product.group.map((groupProduct, index) => (
                                                <Color
                                                    key={`${this.state.product._id}:colorGroup:${groupProduct._id}`}
                                                    product={groupProduct}
                                                    selected={this.isColorSelected(index)}
                                                    index={index}
                                                    onPress={this.onColorPicked} />
                                            ))
                                        }

                                    </View>
                                </View>
                            )
                        }

                        <Accordion title='Ürün Hakkında' expanded>
                            <>
                                <View style={styles.details2}>
                                    <Text style={styles.productDetail}>{details ?? 'Ürün detayı bulunmamaktadır'}</Text>
                                </View>

                                <View style={styles.extraDetailsContainer}>
                                    {
                                        specifications.map((specification, index) => (
                                            <Specification title={specification.name} value={specification.value} first={index === 0} />
                                        ))
                                    }
                                </View>
                            </>
                        </Accordion>

                        <Accordion title={`Yorumlar (${comments.length})`}>
                            <>
                                {
                                    comments.map((comment) => (
                                        <Comment item={comment} />
                                    ))
                                }
                            </>
                        </Accordion>

                        <View style={styles.emptyFooter} />
                    </ScrollView>

                    <View style={styles.buttonContainer}>
                        <ButtonComponent text='Sepete Ekle' onClick={this.onAddToCartClick} />
                    </View>
                </View>
            )
        }

        return <Loading />
    }
}

const styles = ScaledSheet.create({
    container: {
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: COLORS.LIGHT
    },
    scrollContainer: {
        justifyContent: 'space-between'
    },
    imageContainer: {
        flex: 1,
        height: '260@s'
    },
    colors: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: '20@s'
    },
    colorContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: '20@s',
        marginHorizontal: '10@s',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.GRAY
    },
    details: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: '20@s',
        marginHorizontal: '10@s',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.GRAY
    },
    details2: {
        flex: 1,
        flexDirection: 'column',
        marginTop: '20@s',
        marginHorizontal: '10@s'
    },
    extraDetailsContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: '20@s',
        marginHorizontal: '10@s',
        borderWidth: 1,
        borderColor: COLORS.GRAY
    },
    productDetailText: {
        margin: '4@s',
        fontSize: '18@s',
        fontWeight: 'bold'
    },
    productDetail: {
        margin: '4@s',
        fontSize: '15@s'
    },
    price: {
        fontSize: '16@s',
        marginRight: '8@s',
        fontWeight: '700',
        color: COLORS.DARK
    },
    discountedPrice: {
        fontWeight: 'normal',
        fontSize: '16@s',
        // fontWeight: '100',
        textDecorationLine: 'line-through'
    },
    productName: {
        fontSize: '16@s',
        color: COLORS.DARK
    },
    colorText: {
        fontSize: '16@s',
        fontWeight: 'bold'
    },
    colorName: {
        fontWeight: 'normal'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: COLORS.LIGHT
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        display: 'flex',
        textAlign: 'center',
        margin: '4@s'
    },
    priceContainer: {
        margin: '4@s',
        paddingHorizontal: '8@s',
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyFooter: {
        height: '100@s'
    },
    iconStyle: {
        marginRight: 18
    },
    shadowContainer: {
        backgroundColor: COLORS.LIGHT
    },
    imageContainerStyle: {
        paddingBottom: 20
    }
})

const mapStateToProps = ({
    sourceReducer: { token, user },
    globalReducer: { messagePopupRef }
}) => ({
    token,
    user,
    messagePopupRef
})

const mapDispatchToProps = {
    increaseProductQuantity,
    addToFavoriteProducts,
    removeFromFavoriteProdutcs
}

export default connect(mapStateToProps, mapDispatchToProps)(FullProductScreen)
