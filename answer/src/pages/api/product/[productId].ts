// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Product } from '@/types/types'
import type { NextApiRequest, NextApiResponse } from 'next'
import productsData from '../../../data/products.json'

export type ProductResponse = {
    product: Product
}

const products = productsData as Array<Product>


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProductResponse>
) {
    const { productId } = req.query
    const product = products.find(product => product.id.toString() === productId)
    if (!product) {
        res.status(404)
    } else {
        res.status(200).json({ product })
    }
}
