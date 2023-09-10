export const getCurrentUrl = (path: string) => {
    // deployed to vercel / else case / localhost
    const host = process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.NEXT_PUBLIC_HOST ?? 'http://localhost:3000'
    return `${host}${path}`
}