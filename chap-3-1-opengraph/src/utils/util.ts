export const getCurrentUrl = (path: string) => {
    const host = process.env.NEXT_PUBLIC_HOST
    return `${host}${path}`

}