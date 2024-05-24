const axios = require('axios').default
const print = require('@medv/prettyjson')

const get = async (url) => {
    try {
        tryGet(url)
    } catch (error) {
        console.error(error)
    }
}

const tryGet = async (url) => {
    url = normalizeUrl(url)
    const res = await axios.get(url)
    console.log(res.status)
    printHeader(res.headers)    
    console.log(print(res.data))
}

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

module.exports.get = get
