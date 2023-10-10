export const getCurrentUrl = (path: string) => {
    // deployed to vercel / else case / localhost
    let host = ''
    if (process.env.NEXT_PUBLIC_VERCEL_URL) {
        host = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    }
    else {
        host = process.env.NEXT_PUBLIC_HOST ?? 'http://localhost:3000'
    }
    return `${host}${path}`
}