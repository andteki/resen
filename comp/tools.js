const normalizeUrl = (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url
    }
    return url    
}

const printHeader = (headers) => {
    // console.log(headers)
    console.log('Content-Type:',headers['content-type'])
    console.log('Date:', headers.date)
    console.log('X-Powered-By:', headers['x-powered-by'])
}

module.exports = { normalizeUrl, printHeader }
