const print = require('@medv/prettyjson')

const normalizeUrl = (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url
    }
    return url    
}

const printHeader = (res) => {
    console.log(res.status)
    console.log('Content-Type:', res.headers['content-type'])
    console.log('Date:', res.headers.date)
    console.log('X-Powered-By:', res.headers['x-powered-by'])
}

const printBody = (res) => {
    console.log(print(res.data))
}

const convertToObject = (params) => {
    return params.reduce((acc, param) => {
        const [key, value] = param.split('=')
        acc[key] = value
        return acc
    }, {})
}

const getAuthStr = (options) => {    
    if(!options.hasOwnProperty('auth')) {
        console.log('No token specified')
        return
    }
    if(!options.hasOwnProperty('authType')) {
        console.log('No type specified')
        return
    }
    if(options.authType != 'bearer') {
        console.log('Only bearer')
        return
    }
    return { headers: {
        'Authorization': `Bearer ${options.auth}`
        }}
}

const isEmpty = (obj) => {
    return Object.keys(obj).length === 0
}

module.exports = { 
    normalizeUrl, 
    printHeader,
    printBody,
    convertToObject,
    getAuthStr,
    isEmpty
}
