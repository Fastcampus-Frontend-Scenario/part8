import { fetchProduct } from "@/api/products"
import { Header } from "@/components/Header"
import { Product } from "@/types/types"
import styled from "@emotion/styled"
import Card from "@mui/material/Card"
import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"
import { useState } from "react"

export const getServerSideProps = async (context: any) => {
    const { productId } = context.params

    const product = await fetchProduct(productId)
    return {
        props: {
            product
        }
    }
}

type Props = {
    product: Product
}
const ProductPage: React.FC<Props> = ({product}) => {
    const { id, title, description, image, price, rating } = product

    return (
        <div>
            <Header
                metaTitle={title}
                metaDescription={`${description} | ${price}`}
                ogTitle={title}
                ogDescription={`${description} | ${price}`}
                ogImage={image}
                ogSiteName='이커머스 쇼핑몰'
            />
            <ProductComponent product={product}/>
        </div>
    )
}

const ProductComponent: React.FC<Props> = ({product}) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const { id, title, description, image, price, rating } = product

    const size = imageLoaded ? 120 : 0
    return (
        <CardLayout>
            <img src={image} alt={title} width={size} height={size} loading='lazy' onLoad={() => setImageLoaded(true)} />
            {!imageLoaded && <Skeleton variant='rounded' width={120} height={120} />}
            <Typography variant='body2' fontWeight={'bold'}>{title}</Typography>
            <Typography variant='caption'>{`$ ${price.toLocaleString()}`}</Typography>
        </CardLayout>
    )
}

const CardLayout = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: 160,
    height: 300,
    margin: 4,
})

export default ProductPage