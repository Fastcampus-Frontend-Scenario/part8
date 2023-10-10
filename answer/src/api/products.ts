import { ProductResponse } from "@/pages/api/product/[productId]"
import { Product } from "@/types/types"

export const fetchProduct = async (productId: number): Promise<Product> => {
    const products = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/product/${productId}`)
    const productJson = await products.json() as ProductResponse
    return productJson.product
}