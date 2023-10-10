import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Product } from '@/types/Product';
import { getCurrentUrl } from '@/utils/util';
import { Divider, Stack, Typography } from '@mui/material';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    const url = getCurrentUrl(`/api/product/${id}`)
    const product = await axios.get<Product>(url)
    
    return {
        props: product.data
    };
}

const ProductPage: React.FC<{product: Product}> = (props) => {
    const path = usePathname()
    const url = getCurrentUrl(path)
    const product = props.product
    console.log(product.image, product)
    return (
        <>
            <Head>
                <title>{`${product.name} | 헬로우 마켓`}</title>
                <meta property="og:title" content={product.name} />
                <meta property="og:description" content={`${product.description} | ${product.originalPrice - product.discountAmount}`} />
                <meta property="og:url" content={url} />
                <meta property="og:image" content={product.image} />

                <meta name="twitter:card" content="summary_large_image"/>
                <meta property="twitter:domain" content="my-part8-git-main-semonec.vercel.app"/>
                <meta property="twitter:url" content="https://my-part8-git-main-semonec.vercel.app/product/1"/>
                <meta name="twitter:title" content="Hello Cola"/>
                <meta name="twitter:description" content="맛있는 헬로우 콜라! | 1000"/>
                <meta name="twitter:image" content="https://my-part8-git-main-semonec.vercel.app/images/cola.png"/>

            </Head>
            <Stack direction={'column'} width={'100%'} height={'100%'}>
                <Stack direction='row' spacing={4}>
                    <Image src={product.image} alt={product.name} style={{ flex: 1, objectFit: 'contain' }} width={100} height={171} />
                    <Stack direction={'column'} spacing={2} flex={1}>
                        <Typography fontSize={30}>{product.name}</Typography>
                        <Typography fontSize={20} style={{  textDecoration: 'line-through' }}>{`원래 가격 : ${product.originalPrice}`}</Typography>
                        <Typography fontSize={20} style={{ fontWeight: 700,  color: 'red' }}>{`할인 가격: ${product.originalPrice - product.discountAmount}`}</Typography>
                    </Stack>
                </Stack>
                <Divider style={{marginBottom: 20}}/>
                <Typography>{product.description}</Typography>
            </Stack>
        </>
    )
}

export default ProductPage