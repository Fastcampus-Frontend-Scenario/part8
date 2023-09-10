import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '@/types/Product';

import json from '../../../data/product.json'

type ProductResponse = {
    product: Product | null
}
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProductResponse>
) {
    const { id } = req.query;
    try {
        const product = json.products.find((product) => product.id === parseInt(id as string))
        if (product) {
            res.status(200).json({ product })
        } else {
            res.status(200).json({ product: null})
        }
    } catch (e) {
        res.status(401)
    }
}
