import { Header } from '@/components/Header'


export default function Home() {
  return (
    <>
      <Header
        metaTitle='메인페이지'
        metaDescription='메인페이지 입니다'
        ogTitle='메인페이지'
        ogDescription='메인페이지 입니다'
        ogImage='/next.svg'
        ogSiteName='이커머스 쇼핑몰'
      />
      <main >
        <div>메인 페이지</div>
      </main>
    </>
  )
}
