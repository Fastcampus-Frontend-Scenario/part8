# Part.8) 프로덕트 성공을 위한 노출을 늘리는 검색엔진 최적화 과제

# 목적

기능 요구사항 문서를 기반으로 프로덕트를 구현하다.

프로덕트 성공을 위한 노출을 늘리는 검색엔진 최적화 기법을 도입한다

## 요구사항

- 주어진 과제의 프로덕트 상세 페이지의 metadata 도입
- OpenGraph tag 적용
- 주어진 과제의 sitemap.xml 을 생성한다
  - 정적 페이지들에 대한 sitemap 생성
  - 동적 제품 상세 페이지들에 대한 sitemap generator 를 이용한 sitemap-products.xml 생성

### Types

```
export type ProductRating = {
    rate: number
    count: number
}
export type Product = {
    id: number
    title: string
    price: number
    image: string
    description: string
    rating: ProductRating
}
```

### API

- url: `/api/products`
  - params
    - 없음
  - 사용 예

        ```
        fetch('/api/products') 
        
        ```

  - Request

        ```
        queryParam: void
        ```

  - Response

        ```
        interface Response {
         products: Array<Product>
        }
        ```

- url: `/api/product/{productId}`
  - params
    - 없음
  - 사용 예

        ```
        fetch('/api/product/1') 
        
        ```

  - Request

        ```
        queryParam: void
        ```

  - Response

        ```
        interface Response {
         product: Product
        }
        ```

## Page metadata

|  | / | /terms | /products | /product/{productId} | /cart |
| --- | --- | --- | --- | --- | --- |
| meta:title | 메인페이지 | 약관 | 제품 리스트 | {product.title} | 장바구니 |
| meta:description | 메인페이지입니다  | 약관입니다 | 제품 리스트 입니다 | {product.description} - {product.price} | 장바구니입니다 |
| og:title | 메인페이지 | 약관 | 제품 리스트 | {product.title} | 장바구니 |
| og:image | - | - | - | {product.image} | - |
| og:description | 메인페이지입니다  | 약관입니다 | 제품 리스트 입니다 | {product.description} - {product.price} | 장바구니입니다 |
| og:site_name | website | website | website | website | website |
| og:url | {currentUrl} | {currentUrl} | {currentUrl} | {currentUrl} | {currentUrl} |
