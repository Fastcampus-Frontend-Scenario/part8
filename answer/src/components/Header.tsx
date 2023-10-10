import Head from "next/head"

type Props = {
    metaTitle?: string
    metaDescription?: string
    ogTitle?: string
    ogDescription?: string
    ogImage?: string
    ogSiteName?: string
}

export const Header: React.FC<Props> = ({
    metaTitle,
    metaDescription,
    ogTitle,
    ogDescription,
    ogImage,
    ogSiteName,
}) => {
    
    return (
        <Head>
            {Boolean(metaTitle) && <title>{metaTitle}</title>}
            {Boolean(metaDescription) && <meta name={'description'} content={metaDescription} />}
            {Boolean(ogTitle) && <meta name={'og:title'} content={ogTitle} />}
            {Boolean(ogDescription) && <meta name={'og:description'} content={ogDescription} />}
            {Boolean(ogImage) && <meta name={'og:image'} content={ogImage} />}
            {Boolean(ogSiteName) && <meta name={'og:site_name'} content={ogSiteName} />}
        </Head>
    )
}