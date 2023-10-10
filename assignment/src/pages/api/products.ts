// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Product } from '@/types/types'
import type { NextApiRequest, NextApiResponse } from 'next'
import productsData from '../../data/products.json'

export type ProductResponse = {
    products: Array<Product>
}

const products = productsData as Array<Product>

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProductResponse>
) {
    res.status(200).json({ products })
}
