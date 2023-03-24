export const pageview = (url) => {
    window.gtag('config', 'UA-157466357-1', {
        path_url: url,
    })
}

export const pageadds = (url) => {
    window.gtag('config', 'AW-665703888', {
        path_url: url,
    })
}