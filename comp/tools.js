const normalizeUrl = (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url
    }
    return url    
}

const printHeader = (headers) => {
    console.log('Content-Type:',headers['content-type'])
    console.log('Date:', headers.date)
    console.log('X-Powered-By:', headers['x-powered-by'])
}

const convertToObject = (params) => {
    return params.reduce((acc, param) => {
        const [key, value] = param.split('=')
        acc[key] = value
        return acc
    }, {})
}

module.exports = { 
    normalizeUrl, 
    printHeader,
    convertToObject
}
